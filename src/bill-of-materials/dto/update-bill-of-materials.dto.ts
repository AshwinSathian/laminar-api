import { PartialType } from '@nestjs/swagger';
import { CreateBillOfMaterialsDTO } from './create-bill-of-materials.dto';

export class UpdateBillOfMaterialsDTO extends PartialType(
  CreateBillOfMaterialsDTO,
) {}
