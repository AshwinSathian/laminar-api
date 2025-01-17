import { BillOfMaterials } from '@laminar-api/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateBillOfMaterialsDTO } from './dto/create-bill-of-materials.dto';
import { UpdateBillOfMaterialsDTO } from './dto/update-bill-of-materials.dto';

@Injectable()
export class BillOfMaterialsService {
  constructor(
    @InjectModel(BillOfMaterials.name) private BomModel: Model<BillOfMaterials>,
  ) {}

  create(createBomDto: CreateBillOfMaterialsDTO): Promise<BillOfMaterials> {
    try {
      const createdBom = new this.BomModel(createBomDto);
      createdBom.id = createdBom.id || uuidv4();
      return createdBom.save();
    } catch (error) {
      throw new HttpException(
        { title: 'BOM Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<BillOfMaterials[]> {
    try {
      return this.BomModel.find().exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load BOMs', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  countAll(): Promise<number> {
    try {
      return this.BomModel.countDocuments().exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Count BOMs', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string): Promise<BillOfMaterials> {
    try {
      return this.BomModel.findOne({ id }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Find BOM', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(
    id: string,
    updateBomDto: UpdateBillOfMaterialsDTO,
  ): Promise<BillOfMaterials> {
    try {
      return this.BomModel.findOneAndUpdate({ id }, updateBomDto).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'BOM Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<BillOfMaterials> {
    try {
      const deletedBom = await this.BomModel.findOneAndDelete({
        id,
      }).exec();
      return deletedBom;
    } catch (error) {
      throw new HttpException(
        { title: 'BOM Deletion Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
