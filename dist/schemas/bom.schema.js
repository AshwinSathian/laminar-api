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
exports.BillOfMaterialsSchema = exports.BillOfMaterials = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AttachmentSchema = class AttachmentSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AttachmentSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AttachmentSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AttachmentSchema.prototype, "url", void 0);
AttachmentSchema = __decorate([
    (0, mongoose_1.Schema)()
], AttachmentSchema);
const AttachmentSchemaFactory = mongoose_1.SchemaFactory.createForClass(AttachmentSchema);
let PartDetail = class PartDetail {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PartDetail.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PartDetail.prototype, "partNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PartDetail.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], PartDetail.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [AttachmentSchemaFactory], required: false }),
    __metadata("design:type", Array)
], PartDetail.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PartDetail.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PartDetail.prototype, "manufacturingMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PartDetail.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, required: false }),
    __metadata("design:type", Boolean)
], PartDetail.prototype, "nonLinrary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: false }),
    __metadata("design:type", Object)
], PartDetail.prototype, "supplierOrManufacturer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PartDetail.prototype, "unitCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], PartDetail.prototype, "totalPartCost", void 0);
PartDetail = __decorate([
    (0, mongoose_1.Schema)()
], PartDetail);
const PartDetailSchema = mongoose_1.SchemaFactory.createForClass(PartDetail);
let BillOfMaterials = class BillOfMaterials {
};
exports.BillOfMaterials = BillOfMaterials;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], BillOfMaterials.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], BillOfMaterials.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], BillOfMaterials.prototype, "contactInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], BillOfMaterials.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], BillOfMaterials.prototype, "dateOfApproval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], BillOfMaterials.prototype, "partCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], BillOfMaterials.prototype, "totalCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PartDetailSchema], required: true }),
    __metadata("design:type", Array)
], BillOfMaterials.prototype, "parts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], BillOfMaterials.prototype, "currency", void 0);
exports.BillOfMaterials = BillOfMaterials = __decorate([
    (0, mongoose_1.Schema)()
], BillOfMaterials);
exports.BillOfMaterialsSchema = mongoose_1.SchemaFactory.createForClass(BillOfMaterials);
//# sourceMappingURL=bom.schema.js.map