import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  create(createMaterialDto: CreateMaterialDTO): Promise<Material> {
    try {
      const createdMaterial = new this.MaterialModel(createMaterialDto);
      createdMaterial.id = createdMaterial.id || uuidv4();
      return createdMaterial.save();
    } catch (error) {
      throw new HttpException(
        { title: 'Material Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<Material[]> {
    try {
      return this.MaterialModel.find().populate('suppliers').exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load Materials', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findSupplierMaterials(id: string): Promise<Material[]> {
    try {
      return this.MaterialModel.find({ 'suppliers.id': id }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Find Supplier Materials', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string): Promise<Material> {
    try {
      return this.MaterialModel.findOne({ id }).populate('suppliers').exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Find Material', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: string, updateMaterialDto: UpdateMaterialDTO): Promise<Material> {
    try {
      return this.MaterialModel.findOneAndUpdate(
        { id },
        updateMaterialDto,
      ).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Material Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Material> {
    try {
      const deletedMaterial = await this.MaterialModel.findOneAndDelete({
        id,
      }).exec();
      return deletedMaterial;
    } catch (error) {
      throw new HttpException(
        { title: 'Material Deletion Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loadSuppliers(ids: string[]): Promise<Supplier[]> {
    try {
      return this.SupplierModel.find({
        id: { $in: ids },
      }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load Suppliers', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
