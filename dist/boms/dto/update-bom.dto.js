"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_bom_dto_1 = require("./create-bom.dto");
class UpdateBomDto extends (0, swagger_1.PartialType)(create_bom_dto_1.CreateBomDto) {
}
exports.UpdateBomDto = UpdateBomDto;
//# sourceMappingURL=update-bom.dto.js.map