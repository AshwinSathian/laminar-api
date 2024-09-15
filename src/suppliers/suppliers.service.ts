import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from 'src/schemas/supplier.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private SupplierModel: Model<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDTO): Promise<Supplier> {
    const createdSupplier = new this.SupplierModel(createSupplierDto);
    createdSupplier.id = createdSupplier.id || uuidv4();
    return createdSupplier.save();
  }

  findAll(): Promise<Supplier[]> {
    return this.SupplierModel.find().exec();
  }

  findOne(id: string): Promise<Supplier> {
    return this.SupplierModel.findOne({ id }).exec();
  }

  update(id: string, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier> {
    const updatedSupplier = this.SupplierModel.findOneAndUpdate(
      { id },
      updateSupplierDto,
    ).exec();
    return updatedSupplier;
  }

  async remove(id: string) {
    const deletedSupplier = await this.SupplierModel.findOneAndDelete({
      id,
    }).exec();
    return deletedSupplier;
  }
}
