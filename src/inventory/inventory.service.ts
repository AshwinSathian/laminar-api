import { Injectable } from '@nestjs/common';
import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from 'src/schemas/inventory.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private InventoryModel: Model<Inventory>,
  ) {}

  create(CreateInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
    const createdInventory = new this.InventoryModel(CreateInventoryDTO);
    createdInventory.id = createdInventory.id || uuidv4();
    return createdInventory.save();
  }

  findAll(): Promise<Inventory[]> {
    return this.InventoryModel.find().exec();
  }

  findOne(id: string): Promise<Inventory> {
    return this.InventoryModel.findOne({ id }).exec();
  }

  update(
    id: string,
    UpdateInventoryDTO: UpdateInventoryDTO,
  ): Promise<Inventory> {
    const updatedInventory = this.InventoryModel.findOneAndUpdate(
      { id },
      UpdateInventoryDTO,
    ).exec();
    return updatedInventory;
  }

  async remove(id: string) {
    const deletedInventory = await this.InventoryModel.findOneAndDelete({
      id,
    }).exec();
    return deletedInventory;
  }
}
