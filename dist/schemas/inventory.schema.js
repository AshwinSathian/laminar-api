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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventorySchema = exports.Inventory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Inventory = class Inventory {
};
exports.Inventory = Inventory;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Inventory.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Inventory.prototype, "itemId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Inventory.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        townCity: { type: String, required: true },
        stateProvinceCounty: { type: String, required: true },
        country: { type: String, required: true },
        postalZipCode: { type: String, required: true },
        mapsLink: { type: String },
    })),
    __metadata("design:type", Object)
], Inventory.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Inventory.prototype, "notes", void 0);
exports.Inventory = Inventory = __decorate([
    (0, mongoose_1.Schema)()
], Inventory);
exports.InventorySchema = mongoose_1.SchemaFactory.createForClass(Inventory);
//# sourceMappingURL=inventory.schema.js.map