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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const material_schema_1 = require("../schemas/material.schema");
const supplier_schema_1 = require("../schemas/supplier.schema");
const uuid_1 = require("uuid");
let MaterialsService = class MaterialsService {
    constructor(MaterialModel, SupplierModel) {
        this.MaterialModel = MaterialModel;
        this.SupplierModel = SupplierModel;
    }
    create(createMaterialDto) {
        var _a;
        const createdMaterial = new this.MaterialModel(createMaterialDto);
        createdMaterial.id = createdMaterial.id || (0, uuid_1.v4)();
        createdMaterial.suppliers = ((_a = createdMaterial.suppliers) === null || _a === void 0 ? void 0 : _a.length)
            ? createdMaterial.suppliers
            : ['a848ec77-cc99-4a82-81f5-e3aba4a2ddf9'];
        return createdMaterial.save();
    }
    findAll() {
        return this.MaterialModel.find().populate('suppliers').exec();
    }
    findSupplierMaterials(id) {
        return this.MaterialModel.find({ suppliers: id }).exec();
    }
    findOne(id) {
        return this.MaterialModel.findOne({ id }).populate('suppliers').exec();
    }
    update(id, updateMaterialDto) {
        const updatedMaterial = this.MaterialModel.findOneAndUpdate({ id }, updateMaterialDto).exec();
        return updatedMaterial;
    }
    async remove(id) {
        const deletedMaterial = await this.MaterialModel.findOneAndDelete({
            id,
        }).exec();
        return deletedMaterial;
    }
    async loadSuppliers(ids) {
        const suppliers = await this.SupplierModel.find({
            id: { $in: ids },
        }).exec();
        const modelledSuppliers = suppliers === null || suppliers === void 0 ? void 0 : suppliers.map((s) => new this.SupplierModel(s));
        return modelledSuppliers;
    }
};
MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(material_schema_1.Material.name)),
    __param(1, (0, mongoose_1.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MaterialsService);
exports.MaterialsService = MaterialsService;
//# sourceMappingURL=materials.service.js.map