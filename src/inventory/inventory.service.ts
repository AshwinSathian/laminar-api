import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/schemas/inventory.schema';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private InventoryModel: Model<Inventory>,
  ) {}

  create(CreateInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
    try {
      const createdInventory = new this.InventoryModel(CreateInventoryDTO);
      createdInventory.id = createdInventory.id || uuidv4();
      return createdInventory.save();
    } catch (error) {
      throw new HttpException(
        { title: 'Inventory Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createMany(createInventoryDtos: CreateInventoryDTO[]): Promise<Inventory[]> {
    try {
      const createdInventories = createInventoryDtos.map(
        (createInventoryDto) => {
          const createdInventory = new this.InventoryModel(createInventoryDto);
          createdInventory.id = createdInventory.id || uuidv4();
          return createdInventory;
        },
      );
      return this.InventoryModel.insertMany(createdInventories, {
        ordered: false,
      });
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Create Inventory Records', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<Inventory[]> {
    try {
      return this.InventoryModel.find().exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Could not load Inventory Records', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string): Promise<Inventory> {
    try {
      return this.InventoryModel.findOne({ id }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Could not Fetch Inventory', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(
    id: string,
    UpdateInventoryDTO: UpdateInventoryDTO,
  ): Promise<Inventory> {
    try {
      const updatedInventory = this.InventoryModel.findOneAndUpdate(
        { id },
        UpdateInventoryDTO,
      ).exec();
      return updatedInventory;
    } catch (error) {
      throw new HttpException(
        { title: 'Inventory Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  updateMany(updateInventoryDtos: UpdateInventoryDTO[]): Promise<any> {
    try {
      const bulkOps = updateInventoryDtos.map((updateData) => ({
        updateOne: {
          filter: { id: updateData.id },
          update: { $set: updateData },
        },
      }));
      return this.InventoryModel.bulkWrite(bulkOps);
    } catch (error) {
      throw new HttpException(
        { title: 'Inventories Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedInventory = await this.InventoryModel.findOneAndDelete({
        id,
      }).exec();
      return deletedInventory;
    } catch (error) {
      throw new HttpException(
        { title: 'Inventory Deletion Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private _mapRowToInventory(
    row: any,
  ): CreateInventoryDTO | UpdateInventoryDTO {
    return {
      id: row['ID'] || '',
      itemId: row['Item Name/ID'],
      description: row['Description'],
      address: {
        addressLine1: row['Address Line 1'] || '',
        addressLine2: row['Address Line 2'] || '',
        townCity: row['Town/City'] || '',
        stateProvinceCounty: row['State/Province/County'] || '',
        country: row['Country'] || '',
        postalZipCode: row['Postal/Zip Code'] || '',
        mapsLink: row['Maps Link'] || '',
      },
      notes: row['Notes'],
    };
  }

  async importInventories(file: Express.Multer.File): Promise<{
    inserted: {
      count: number;
      names: string;
    };
    updated: { count: number };
  }> {
    try {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const inventoriesToInsert: CreateInventoryDTO[] = [];
      const inventoriesToUpdate: UpdateInventoryDTO[] = [];

      for (const row of data) {
        const inventoryData = this._mapRowToInventory(row);

        if (inventoryData.id) {
          inventoriesToUpdate.push(inventoryData);
        } else {
          inventoriesToInsert.push(inventoryData as CreateInventoryDTO);
        }
      }

      const [inserted, updated] = await Promise.all([
        this.createMany(inventoriesToInsert),
        this.updateMany(inventoriesToUpdate),
      ]);

      return {
        inserted: {
          count: inserted?.length || 0,
          names: inserted?.map((i) => i.itemId)?.join(', ') || '',
        },
        updated: { count: updated?.modifiedCount || 0 },
      };
    } catch (error) {
      throw new HttpException(
        { title: 'Inventories Import Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
