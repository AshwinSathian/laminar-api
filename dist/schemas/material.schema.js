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
exports.MaterialEmbedSchema = exports.MaterialEmbed = exports.MaterialSchema = exports.Material = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_schema_1 = require("./common.schema");
const supplier_schema_1 = require("./supplier.schema");
let Material = class Material {
};
exports.Material = Material;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], Material.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Material.prototype, "partName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], Material.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Material.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Material.prototype, "manufacturingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], Material.prototype, "drawings", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        length: {
            value: { type: Number },
            unit: { type: String },
        },
        breadth: {
            value: { type: Number },
            unit: { type: String },
        },
        height: {
            value: { type: Number },
            unit: { type: String },
        },
    })),
    __metadata("design:type", Object)
], Material.prototype, "dimensions", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        value: { type: Number },
        unit: { type: String },
    })),
    __metadata("design:type", Object)
], Material.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], Material.prototype, "dataSheets", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [supplier_schema_1.SupplierEmbedSchema] }),
    __metadata("design:type", Array)
], Material.prototype, "suppliers", void 0);
exports.Material = Material = __decorate([
    (0, mongoose_1.Schema)()
], Material);
exports.MaterialSchema = mongoose_1.SchemaFactory.createForClass(Material);
let MaterialEmbed = class MaterialEmbed {
};
exports.MaterialEmbed = MaterialEmbed;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MaterialEmbed.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MaterialEmbed.prototype, "partName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], MaterialEmbed.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MaterialEmbed.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], MaterialEmbed.prototype, "manufacturingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], MaterialEmbed.prototype, "drawings", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        length: {
            value: { type: Number },
            unit: { type: String },
        },
        breadth: {
            value: { type: Number },
            unit: { type: String },
        },
        height: {
            value: { type: Number },
            unit: { type: String },
        },
    })),
    __metadata("design:type", Object)
], MaterialEmbed.prototype, "dimensions", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        value: { type: Number },
        unit: { type: String },
    })),
    __metadata("design:type", Object)
], MaterialEmbed.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [common_schema_1.AttachmentSchema], required: false }),
    __metadata("design:type", Array)
], MaterialEmbed.prototype, "dataSheets", void 0);
exports.MaterialEmbed = MaterialEmbed = __decorate([
    (0, mongoose_1.Schema)()
], MaterialEmbed);
exports.MaterialEmbedSchema = mongoose_1.SchemaFactory.createForClass(MaterialEmbed);
//# sourceMappingURL=material.schema.js.map