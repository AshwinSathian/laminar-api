import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from 'src/schemas/material.schema';
import { Supplier } from 'src/schemas/supplier.schema';
import { v4 as uuidv4 } from 'uuid';
import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name) private MaterialModel: Model<Material>,
    @InjectModel(Supplier.name) private SupplierModel: Model<Supplier>,
  ) {}

  create(createMaterialDto: CreateMaterialDTO) {
    const createdMaterial = new this.MaterialModel(createMaterialDto);
    createdMaterial.id = createdMaterial.id || uuidv4();
    createdMaterial.suppliers = createdMaterial.suppliers?.length
      ? createdMaterial.suppliers
      : ['a848ec77-cc99-4a82-81f5-e3aba4a2ddf9'];
    return createdMaterial.save();
  }

  findAll(): Promise<Material[]> {
    return this.MaterialModel.find().populate('suppliers').exec();
  }

  findSupplierMaterials(id: string): Promise<Material[]> {
    return this.MaterialModel.find({ suppliers: id }).exec();
  }

  findOne(id: string): Promise<Material> {
    return this.MaterialModel.findOne({ id }).populate('suppliers').exec();
  }

  update(id: string, updateMaterialDto: UpdateMaterialDTO): Promise<Material> {
    const updatedMaterial = this.MaterialModel.findOneAndUpdate(
      { id },
      updateMaterialDto,
    ).exec();
    return updatedMaterial;
  }

  async remove(id: string) {
    const deletedMaterial = await this.MaterialModel.findOneAndDelete({
      id,
    }).exec();
    return deletedMaterial;
  }

  async loadSuppliers(ids: string[]): Promise<Supplier[]> {
    const suppliers = await this.SupplierModel.find({
      id: { $in: ids },
    }).exec();
    const modelledSuppliers = suppliers?.map((s) => new this.SupplierModel(s));
    return modelledSuppliers;
  }
}
