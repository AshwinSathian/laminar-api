import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillOfMaterials } from 'src/schemas/bom.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateBillOfMaterialsDTO } from './dto/create-bill-of-materials.dto';
import { UpdateBillOfMaterialsDTO } from './dto/update-bill-of-materials.dto';

@Injectable()
export class BillOfMaterialsService {
  constructor(
    @InjectModel(BillOfMaterials.name) private BomModel: Model<BillOfMaterials>,
  ) {}

  create(createBomDto: CreateBillOfMaterialsDTO): Promise<BillOfMaterials> {
    const createdBom = new this.BomModel(createBomDto);
    createdBom.id = createdBom.id || uuidv4();
    return createdBom.save();
  }

  findAll(): Promise<BillOfMaterials[]> {
    return this.BomModel.find().exec();
  }

  findOne(id: string): Promise<BillOfMaterials> {
    return this.BomModel.findOne({ id }).exec();
  }

  update(
    id: string,
    updateBomDto: UpdateBillOfMaterialsDTO,
  ): Promise<BillOfMaterials> {
    const updatedBom = this.BomModel.findOneAndUpdate(
      { id },
      updateBomDto,
    ).exec();
    return updatedBom;
  }

  async remove(id: string) {
    const deletedBom = await this.BomModel.findOneAndDelete({
      id,
    }).exec();
    return deletedBom;
  }
}
