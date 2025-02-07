"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaterialDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_material_dto_1 = require("./create-material.dto");
class UpdateMaterialDTO extends (0, swagger_1.PartialType)(create_material_dto_1.CreateMaterialDTO) {
}
exports.UpdateMaterialDTO = UpdateMaterialDTO;
//# sourceMappingURL=update-material.dto.js.map