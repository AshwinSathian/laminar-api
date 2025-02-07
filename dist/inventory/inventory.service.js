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
exports.InventoryService = void 0;
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const XLSX = require("xlsx");
let InventoryService = class InventoryService {
    constructor(InventoryModel) {
        this.InventoryModel = InventoryModel;
    }
    create(CreateInventoryDTO) {
        try {
            const createdInventory = new this.InventoryModel(CreateInventoryDTO);
            createdInventory.id = createdInventory.id || (0, uuid_1.v4)();
            return createdInventory.save();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Inventory Creation Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    createMany(createInventoryDtos) {
        try {
            const createdInventories = createInventoryDtos.map((createInventoryDto) => {
                const createdInventory = new this.InventoryModel(createInventoryDto);
                createdInventory.id = createdInventory.id || (0, uuid_1.v4)();
                return createdInventory;
            });
            return this.InventoryModel.insertMany(createdInventories, {
                ordered: false,
            });
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Create Inventory Records', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        try {
            return this.InventoryModel.find().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Could not load Inventory Records', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    countAll() {
        try {
            return this.InventoryModel.countDocuments().exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Failed to Count Inventory records', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findOne(id) {
        try {
            return this.InventoryModel.findOne({ id }).exec();
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Could not Fetch Inventory', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    update(id, UpdateInventoryDTO) {
        try {
            const updatedInventory = this.InventoryModel.findOneAndUpdate({ id }, UpdateInventoryDTO).exec();
            return updatedInventory;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Inventory Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    updateMany(updateInventoryDtos) {
        try {
            const bulkOps = updateInventoryDtos.map((updateData) => ({
                updateOne: {
                    filter: { id: updateData.id },
                    update: { $set: updateData },
                },
            }));
            return this.InventoryModel.bulkWrite(bulkOps);
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Inventories Update Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const deletedInventory = await this.InventoryModel.findOneAndDelete({
                id,
            }).exec();
            return deletedInventory;
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Inventory Deletion Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    _mapRowToInventory(row) {
        return {
            id: row['ID'] || '',
            itemId: row['Item Name/ID'],
            description: row['Description'],
            address: {
                addressLine1: row['Address Line 1'] || '',
                addressLine2: row['Address Line 2'] || '',
                townCity: row['Town/City'] || '',
                stateProvinceCounty: row['State/Province/County'] || '',
                country: row['Country'] || '',
                postalZipCode: row['Postal/Zip Code'] || '',
                mapsLink: row['Maps Link'] || '',
            },
            notes: row['Notes'],
        };
    }
    async importInventories(file) {
        var _a;
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            const inventoriesToInsert = [];
            const inventoriesToUpdate = [];
            for (const row of data) {
                const inventoryData = this._mapRowToInventory(row);
                if (inventoryData.id) {
                    inventoriesToUpdate.push(inventoryData);
                }
                else {
                    inventoriesToInsert.push(inventoryData);
                }
            }
            const [inserted, updated] = await Promise.all([
                this.createMany(inventoriesToInsert),
                this.updateMany(inventoriesToUpdate),
            ]);
            return {
                inserted: {
                    count: (inserted === null || inserted === void 0 ? void 0 : inserted.length) || 0,
                    names: ((_a = inserted === null || inserted === void 0 ? void 0 : inserted.map((i) => i.itemId)) === null || _a === void 0 ? void 0 : _a.join(', ')) || '',
                },
                updated: { count: (updated === null || updated === void 0 ? void 0 : updated.modifiedCount) || 0 },
            };
        }
        catch (error) {
            throw new common_1.HttpException({ title: 'Inventories Import Failed', details: `${error}` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Inventory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map