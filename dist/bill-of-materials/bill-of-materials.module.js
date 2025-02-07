"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillOfMaterialsModule = void 0;
const schemas_1 = require("../schemas");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bill_of_materials_controller_1 = require("./bill-of-materials.controller");
const bill_of_materials_service_1 = require("./bill-of-materials.service");
let BillOfMaterialsModule = class BillOfMaterialsModule {
};
exports.BillOfMaterialsModule = BillOfMaterialsModule;
exports.BillOfMaterialsModule = BillOfMaterialsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.BillOfMaterials.name, schema: schemas_1.BillOfMaterialsSchema },
            ]),
        ],
        controllers: [bill_of_materials_controller_1.BillOfMaterialsController],
        providers: [bill_of_materials_service_1.BillOfMaterialsService],
    })
], BillOfMaterialsModule);
//# sourceMappingURL=bill-of-materials.module.js.map