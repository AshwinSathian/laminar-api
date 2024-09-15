import { PartialType } from '@nestjs/swagger';
import { CreateInventoryDTO } from './create-inventory.dto';

export class UpdateInventoryDTO extends PartialType(CreateInventoryDTO) {}
