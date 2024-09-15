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
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const inventory_schema_1 = require("../schemas/inventory.schema");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let InventoryService = class InventoryService {
    constructor(InventoryModel) {
        this.InventoryModel = InventoryModel;
    }
    create(CreateInventoryDTO) {
        const createdInventory = new this.InventoryModel(CreateInventoryDTO);
        createdInventory.id = createdInventory.id || (0, uuid_1.v4)();
        return createdInventory.save();
    }
    findAll() {
        return this.InventoryModel.find().exec();
    }
    findOne(id) {
        return this.InventoryModel.findOne({ id }).exec();
    }
    update(id, UpdateInventoryDTO) {
        const updatedInventory = this.InventoryModel.findOneAndUpdate({ id }, UpdateInventoryDTO).exec();
        return updatedInventory;
    }
    async remove(id) {
        const deletedInventory = await this.InventoryModel.findOneAndDelete({
            id,
        }).exec();
        return deletedInventory;
    }
};
InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(inventory_schema_1.Inventory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map