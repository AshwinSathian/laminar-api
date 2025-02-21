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
exports.MetaSchema = exports.Meta = exports.AttachmentSchema = exports.OrgPersonaSchema = exports.UserPersonaSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let UserPersona = class UserPersona {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPersona.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPersona.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPersona.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], UserPersona.prototype, "image", void 0);
UserPersona = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], UserPersona);
exports.UserPersonaSchema = mongoose_1.SchemaFactory.createForClass(UserPersona);
let OrgPersona = class OrgPersona {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], OrgPersona.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], OrgPersona.prototype, "name", void 0);
OrgPersona = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], OrgPersona);
exports.OrgPersonaSchema = mongoose_1.SchemaFactory.createForClass(OrgPersona);
let Attachment = class Attachment {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Attachment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Attachment.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Attachment.prototype, "url", void 0);
Attachment = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Attachment);
exports.AttachmentSchema = mongoose_1.SchemaFactory.createForClass(Attachment);
let Meta = class Meta {
};
exports.Meta = Meta;
__decorate([
    (0, mongoose_1.Prop)({ type: exports.UserPersonaSchema, required: true }),
    __metadata("design:type", UserPersona)
], Meta.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.UserPersonaSchema, required: true }),
    __metadata("design:type", UserPersona)
], Meta.prototype, "updatedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Meta.prototype, "createdDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", Date)
], Meta.prototype, "updatedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.OrgPersonaSchema, required: true }),
    __metadata("design:type", OrgPersona)
], Meta.prototype, "orgInfo", void 0);
exports.Meta = Meta = __decorate([
    (0, mongoose_1.Schema)()
], Meta);
exports.MetaSchema = mongoose_1.SchemaFactory.createForClass(Meta);
//# sourceMappingURL=common.schema.js.map