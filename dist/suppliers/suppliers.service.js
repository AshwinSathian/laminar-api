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
exports.SuppliersService = void 0;
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const XLSX = require("xlsx");
let SuppliersService = class SuppliersService {
    constructor(SupplierModel) {
        this.SupplierModel = SupplierModel;
    }
    create(createSupplierDto) {
        try {
            const createdSupplier = new this.SupplierModel(createSupplierDto);
            createdSupplier.id = createdSupplier.id || (0, uuid_1.v4)();
            return createdSupplier.save();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Supplier Creation Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    createMany(createSupplierDtos) {
        try {
            const createdSuppliers = createSupplierDtos.map((createSupplierDto) => {
                const createdSupplier = new this.SupplierModel(createSupplierDto);
                createdSupplier.id = createdSupplier.id || (0, uuid_1.v4)();
                return createdSupplier;
            });
            return this.SupplierModel.insertMany(createdSuppliers, {
                ordered: false,
            });
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Create Supplier Records', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        try {
            return this.SupplierModel.find().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Could not Load Supplier Records', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    countAll() {
        try {
            return this.SupplierModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Count Suppliers', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        try {
            return this.SupplierModel.findOne({ id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Could not Fetch Supplier', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    update(id, updateSupplierDto) {
        try {
            const updatedSupplier = this.SupplierModel.findOneAndUpdate({ id }, updateSupplierDto).exec();
            return updatedSupplier;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Supplier Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    updateMany(updateSupplierDtos) {
        try {
            const bulkOps = updateSupplierDtos.map((updateData) => ({
                updateOne: {
                    filter: { id: updateData.id },
                    update: { $set: updateData },
                },
            }));
            return this.SupplierModel.bulkWrite(bulkOps);
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Suppliers Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedSupplier = await this.SupplierModel.findOneAndDelete({
                id,
            }).exec();
            return deletedSupplier;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Supplier Deletion Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    _mapRowToSupplier(row) {
        return {
            id: row['ID'] || '',
            name: row['Name'],
            primaryContact: {
                name: row['Primary Contact Name'],
                email: row['Primary Contact Email'],
                designation: row['Designation'] || '',
                phone: {
                    code: row['Phone Code'] || '',
                    number: row['Phone Number'] || '',
                },
            },
            website: row['Website'] || '',
            address: {
                addressLine1: row['Address Line 1'] || '',
                addressLine2: row['Address Line 2'] || '',
                townCity: row['Town/City'] || '',
                stateProvinceCounty: row['State/Province/County'] || '',
                country: row['Country'] || '',
                postalZipCode: row['Postal/Zip Code'] || '',
                mapsLink: row['Maps Link'] || '',
            },
            documents: this._parseDocuments(row['Documents']),
        };
    }
    _parseDocuments(docString) {
        if (!docString)
            return [];
        return docString.split(';').map((doc) => {
            const [name, url] = doc.split(':').map((part) => part.trim());
            return { name, url };
        });
    }
    async importSuppliers(file) {
        var _a;
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            const suppliersToInsert = [];
            const suppliersToUpdate = [];
            for (const row of data) {
                const supplierData = this._mapRowToSupplier(row);
                if (supplierData.id) {
                    suppliersToUpdate.push(supplierData);
                }
                else {
                    suppliersToInsert.push(supplierData);
                }
            }
            const [inserted, updated] = await Promise.all([
                this.createMany(suppliersToInsert),
                this.updateMany(suppliersToUpdate),
            ]);
            return {
                inserted: {
                    count: (inserted === null || inserted === void 0 ? void 0 : inserted.length) || 0,
                    names: ((_a = inserted === null || inserted === void 0 ? void 0 : inserted.map((i) => i.name)) === null || _a === void 0 ? void 0 : _a.join(', ')) || '',
                },
                updated: { count: (updated === null || updated === void 0 ? void 0 : updated.modifiedCount) || 0 },
            };
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Suppliers Import Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map