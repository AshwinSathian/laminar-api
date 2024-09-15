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
exports.BomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const boms_service_1 = require("./boms.service");
const create_bom_dto_1 = require("./dto/create-bom.dto");
const update_bom_dto_1 = require("./dto/update-bom.dto");
let BomsController = class BomsController {
    constructor(bomsService) {
        this.bomsService = bomsService;
    }
    create(createBomDto) {
        return this.bomsService.create(createBomDto);
    }
    findAll() {
        return this.bomsService.findAll();
    }
    findOne(id) {
        return this.bomsService.findOne(+id);
    }
    update(id, updateBomDto) {
        return this.bomsService.update(+id, updateBomDto);
    }
    remove(id) {
        return this.bomsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bom_dto_1.CreateBomDto]),
    __metadata("design:returntype", void 0)
], BomsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BomsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BomsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bom_dto_1.UpdateBomDto]),
    __metadata("design:returntype", void 0)
], BomsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BomsController.prototype, "remove", null);
BomsController = __decorate([
    (0, swagger_1.ApiTags)('BoMs'),
    (0, common_1.Controller)('boms'),
    __metadata("design:paramtypes", [boms_service_1.BomsService])
], BomsController);
exports.BomsController = BomsController;
//# sourceMappingURL=boms.controller.js.map