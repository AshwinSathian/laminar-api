"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const enums_1 = require("../enums");
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const orders_gateway_1 = require("./orders.gateway");
let OrdersService = class OrdersService {
    constructor(OrderModel, MaterialModel, SupplierModel, ordersGateway) {
        this.OrderModel = OrderModel;
        this.MaterialModel = MaterialModel;
        this.SupplierModel = SupplierModel;
        this.ordersGateway = ordersGateway;
    }
    async create(createOrderDto) {
        var _a;
        try {
            const createdOrder = new this.OrderModel(createOrderDto);
            createdOrder.id = createdOrder.id || (0, uuid_1.v4)();
            (_a = createdOrder.parts) === null || _a === void 0 ? void 0 : _a.map((item) => {
                item.id = item.id || (0, uuid_1.v4)();
            });
            return createdOrder.save();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Order Creation Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(query = {}) {
        try {
            return await this.OrderModel.find(query).populate('supplier').exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Load Orders', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    countAll() {
        try {
            return this.OrderModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Count Orders', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findSupplierOrders(id) {
        try {
            return this.OrderModel.find({ 'supplier.id': id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Find Supplier Orders', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const order = await this.OrderModel.findOne({ id })
                .populate('supplier')
                .exec();
            if (!order) {
                throw new common_1.HttpException({ title: 'Order Not Found', details: `No order found with id ${id}` }, common_1.HttpStatus.NOT_FOUND);
            }
            return order;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Find Order', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateOrderDto) {
        var _a;
        try {
            (_a = updateOrderDto.parts) === null || _a === void 0 ? void 0 : _a.map((item) => {
                item.id = item.id || (0, uuid_1.v4)();
            });
            const updatedOrder = await this.OrderModel.findOneAndUpdate({ id }, updateOrderDto, { new: true })
                .populate('supplier')
                .exec();
            if (!updatedOrder) {
                throw new common_1.HttpException({ title: 'Order Not Found', details: `No order found with id ${id}` }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                this.ordersGateway.emitOrderUpdate({
                    orderId: id,
                    updatedAt: new Date().toISOString(),
                });
            }
            return updatedOrder;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Order Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedOrder = await this.OrderModel.findOneAndDelete({
                id,
            }).exec();
            if (!deletedOrder) {
                throw new common_1.HttpException({ title: 'Order Not Found', details: `No order found with id ${id}` }, common_1.HttpStatus.NOT_FOUND);
            }
            return deletedOrder;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Order Deletion Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async loadSuppliers(ids) {
        try {
            return await this.SupplierModel.find({ id: { $in: ids } }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Load Suppliers', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    _generateFilterQuery(listFilters) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const query = {};
        const statuses = [];
        if ((_a = Object.values((listFilters === null || listFilters === void 0 ? void 0 : listFilters.status) || {})) === null || _a === void 0 ? void 0 : _a.some((s) => s)) {
            if (((_b = listFilters.status) === null || _b === void 0 ? void 0 : _b.PLACED) === 'true') {
                statuses.push(enums_1.OrderStatus.placed);
            }
            if (((_c = listFilters.status) === null || _c === void 0 ? void 0 : _c.DISPATCHED) === 'true') {
                statuses.push(enums_1.OrderStatus.dispatched);
            }
            if (((_d = listFilters.status) === null || _d === void 0 ? void 0 : _d.DELIVERED) === 'true') {
                statuses.push(enums_1.OrderStatus.delivered);
            }
        }
        if (statuses === null || statuses === void 0 ? void 0 : statuses.length) {
            query['status'] = { $in: statuses };
        }
        if ((_e = listFilters === null || listFilters === void 0 ? void 0 : listFilters.date) === null || _e === void 0 ? void 0 : _e.min) {
            query['orderDate'] = { $gte: new Date(listFilters.date.min) };
        }
        if ((_f = listFilters === null || listFilters === void 0 ? void 0 : listFilters.date) === null || _f === void 0 ? void 0 : _f.max) {
            query['orderDate'] = { $lte: new Date(listFilters.date.max) };
        }
        if ((_g = listFilters === null || listFilters === void 0 ? void 0 : listFilters.value) === null || _g === void 0 ? void 0 : _g.min) {
            query['totalValue'] = { $gte: (_h = listFilters === null || listFilters === void 0 ? void 0 : listFilters.value) === null || _h === void 0 ? void 0 : _h.min };
        }
        if ((_j = listFilters === null || listFilters === void 0 ? void 0 : listFilters.value) === null || _j === void 0 ? void 0 : _j.max) {
            query['totalValue'] = { $lte: (_k = listFilters === null || listFilters === void 0 ? void 0 : listFilters.value) === null || _k === void 0 ? void 0 : _k.max };
        }
        return query;
    }
    async getFilterConstraints() {
        const constraints = await this.OrderModel.aggregate([
            {
                $facet: {
                    statuses: [
                        { $group: { _id: '$status' } },
                        { $group: { _id: null, statuses: { $push: '$_id' } } },
                        { $project: { _id: 0, statuses: 1 } },
                    ],
                    orderDates: [
                        {
                            $group: {
                                _id: null,
                                oldest: { $min: '$orderDate' },
                                newest: { $max: '$orderDate' },
                            },
                        },
                        { $project: { _id: 0, oldest: 1, newest: 1 } },
                    ],
                    orderValues: [
                        {
                            $group: {
                                _id: null,
                                minValue: { $min: '$totalValue' },
                                maxValue: { $max: '$totalValue' },
                            },
                        },
                        { $project: { _id: 0, minValue: 1, maxValue: 1 } },
                    ],
                },
            },
            {
                $project: {
                    statuses: { $arrayElemAt: ['$statuses.statuses', 0] },
                    oldest: { $arrayElemAt: ['$orderDates.oldest', 0] },
                    newest: { $arrayElemAt: ['$orderDates.newest', 0] },
                    minValue: { $arrayElemAt: ['$orderValues.minValue', 0] },
                    maxValue: { $arrayElemAt: ['$orderValues.maxValue', 0] },
                },
            },
        ]);
        return constraints[0];
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Material.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        orders_gateway_1.OrdersGateway])
], OrdersService);
//# sourceMappingURL=orders.service.js.map