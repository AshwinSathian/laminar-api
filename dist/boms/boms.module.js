"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BomsModule = void 0;
const common_1 = require("@nestjs/common");
const boms_service_1 = require("./boms.service");
const boms_controller_1 = require("./boms.controller");
let BomsModule = class BomsModule {
};
BomsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boms_controller_1.BomsController],
        providers: [boms_service_1.BomsService],
    })
], BomsModule);
exports.BomsModule = BomsModule;
//# sourceMappingURL=boms.module.js.map