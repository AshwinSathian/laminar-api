"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const filter_parse_middleware_1 = require("../middlewares/filter-parse.middleware");
const orders_controller_1 = require("./orders.controller");
const orders_gateway_1 = require("./orders.gateway");
const orders_service_1 = require("./orders.service");
let OrdersModule = class OrdersModule {
    configure(consumer) {
        consumer.apply(filter_parse_middleware_1.FilterParserMiddleware).forRoutes('/');
    }
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: schemas_1.Order.name, schema: schemas_1.OrderSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.Material.name, schema: schemas_1.MaterialSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.Supplier.name, schema: schemas_1.SupplierSchema },
            ]),
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, orders_gateway_1.OrdersGateway],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map