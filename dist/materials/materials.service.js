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
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let MaterialsService = class MaterialsService {
    constructor(MaterialModel, SupplierModel) {
        this.MaterialModel = MaterialModel;
        this.SupplierModel = SupplierModel;
    }
    create(createMaterialDto) {
        try {
            const createdMaterial = new this.MaterialModel(createMaterialDto);
            createdMaterial.id = createdMaterial.id || (0, uuid_1.v4)();
            return createdMaterial.save();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Material Creation Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        try {
            return this.MaterialModel.find().populate('suppliers').exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Load Materials', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    countAll() {
        try {
            return this.MaterialModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Count Materials', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findSupplierMaterials(id) {
        try {
            return this.MaterialModel.find({ 'suppliers.id': id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Find Supplier Materials', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        try {
            return this.MaterialModel.findOne({ id }).populate('suppliers').exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Find Material', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    update(id, updateMaterialDto) {
        try {
            return this.MaterialModel.findOneAndUpdate({ id }, updateMaterialDto).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Material Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedMaterial = await this.MaterialModel.findOneAndDelete({
                id,
            }).exec();
            return deletedMaterial;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Material Deletion Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async loadSuppliers(ids) {
        try {
            return this.SupplierModel.find({
                id: { $in: ids },
            }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Load Suppliers', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Material.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map