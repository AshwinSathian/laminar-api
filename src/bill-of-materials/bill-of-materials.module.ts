import { BillOfMaterials, BillOfMaterialsSchema } from '@laminar-api/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillOfMaterialsController } from './bill-of-materials.controller';
import { BillOfMaterialsService } from './bill-of-materials.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BillOfMaterials.name, schema: BillOfMaterialsSchema },
    ]),
  ],
  controllers: [BillOfMaterialsController],
  providers: [BillOfMaterialsService],
})
export class BillOfMaterialsModule {}
