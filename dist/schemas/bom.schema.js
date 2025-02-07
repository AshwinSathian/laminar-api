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
const common_schema_1 = require("./common.schema");
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
    (0, mongoose_1.Prop)((0, mongoose_1.raw)([
        {
            partNumber: { type: String, required: true },
            partName: { type: String, required: true },
            materialId: { type: String, required: true },
            description: { type: String },
            partImages: [{ type: [common_schema_1.AttachmentSchema] }],
            quantity: { type: Number, required: true },
            units: { type: String, required: true },
            supplierOrManufacturer: { type: Object },
            unitCost: { type: Number, required: true },
            totalPartCost: { type: Number, required: true },
        },
    ])),
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