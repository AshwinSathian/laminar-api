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
exports.BillOfMaterialsService = void 0;
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let BillOfMaterialsService = class BillOfMaterialsService {
    constructor(BomModel) {
        this.BomModel = BomModel;
    }
    create(createBomDto) {
        var _a;
        try {
            const createdBom = new this.BomModel(createBomDto);
            createdBom.id = createdBom.id || (0, uuid_1.v4)();
            createdBom.parts = (_a = createdBom.parts) === null || _a === void 0 ? void 0 : _a.map((p) => (Object.assign(Object.assign({}, p), { id: p.id || (0, uuid_1.v4)() })));
            return createdBom.save();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'BOM Creation Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        try {
            return this.BomModel.find().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Load BOMs', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    countAll() {
        try {
            return this.BomModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Count BOMs', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        try {
            return this.BomModel.findOne({ id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Find BOM', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    update(id, updateBomDto) {
        var _a;
        try {
            updateBomDto.parts = (_a = updateBomDto.parts) === null || _a === void 0 ? void 0 : _a.map((p) => (Object.assign(Object.assign({}, p), { id: p.id || (0, uuid_1.v4)() })));
            return this.BomModel.findOneAndUpdate({ id }, updateBomDto).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'BOM Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedBom = await this.BomModel.findOneAndDelete({
                id,
            }).exec();
            return deletedBom;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'BOM Deletion Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BillOfMaterialsService = BillOfMaterialsService;
exports.BillOfMaterialsService = BillOfMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.BillOfMaterials.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BillOfMaterialsService);
//# sourceMappingURL=bill-of-materials.service.js.map