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
exports.BillOfMaterialsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bill_of_materials_service_1 = require("./bill-of-materials.service");
const create_bill_of_materials_dto_1 = require("./dto/create-bill-of-materials.dto");
const update_bill_of_materials_dto_1 = require("./dto/update-bill-of-materials.dto");
let BillOfMaterialsController = class BillOfMaterialsController {
    constructor(billofmaterialsService) {
        this.billofmaterialsService = billofmaterialsService;
    }
    create(createBillOfMaterialsDTO) {
        return this.billofmaterialsService.create(createBillOfMaterialsDTO);
    }
    findAll() {
        return this.billofmaterialsService.findAll();
    }
    countAll() {
        return this.billofmaterialsService.countAll();
    }
    findOne(id) {
        return this.billofmaterialsService.findOne(id);
    }
    update(id, updateBillOfMaterialsDTO) {
        return this.billofmaterialsService.update(id, updateBillOfMaterialsDTO);
    }
    remove(id) {
        return this.billofmaterialsService.remove(id);
    }
};
exports.BillOfMaterialsController = BillOfMaterialsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_bill_of_materials_dto_1.CreateBillOfMaterialsDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_of_materials_dto_1.CreateBillOfMaterialsDTO]),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "countAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBody)({ type: update_bill_of_materials_dto_1.UpdateBillOfMaterialsDTO }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bill_of_materials_dto_1.UpdateBillOfMaterialsDTO]),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillOfMaterialsController.prototype, "remove", null);
exports.BillOfMaterialsController = BillOfMaterialsController = __decorate([
    (0, swagger_1.ApiTags)('Bill Of Materials'),
    (0, common_1.Controller)('bill-of-materials'),
    __metadata("design:paramtypes", [bill_of_materials_service_1.BillOfMaterialsService])
], BillOfMaterialsController);
//# sourceMappingURL=bill-of-materials.controller.js.map