"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_inventory_dto_1 = require("./create-inventory.dto");
class UpdateInventoryDTO extends (0, swagger_1.PartialType)(create_inventory_dto_1.CreateInventoryDTO) {
}
exports.UpdateInventoryDTO = UpdateInventoryDTO;
//# sourceMappingURL=update-inventory.dto.js.map