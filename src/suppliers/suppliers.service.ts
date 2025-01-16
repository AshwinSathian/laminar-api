import { Supplier } from '@laminar-api/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private SupplierModel: Model<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDTO): Promise<Supplier> {
    try {
      const createdSupplier = new this.SupplierModel(createSupplierDto);
      createdSupplier.id = createdSupplier.id || uuidv4();
      return createdSupplier.save();
    } catch (error) {
      throw new HttpException(
        { title: 'Supplier Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createMany(createSupplierDtos: CreateSupplierDTO[]): Promise<Supplier[]> {
    try {
      const createdSuppliers = createSupplierDtos.map((createSupplierDto) => {
        const createdSupplier = new this.SupplierModel(createSupplierDto);
        createdSupplier.id = createdSupplier.id || uuidv4();
        return createdSupplier;
      });

      return this.SupplierModel.insertMany(createdSuppliers, {
        ordered: false,
      });
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Create Supplier Records', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<Supplier[]> {
    try {
      return this.SupplierModel.find().exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Could not Load Supplier Records', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: string): Promise<Supplier> {
    try {
      return this.SupplierModel.findOne({ id }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Could not Fetch Supplier', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: string, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier> {
    try {
      const updatedSupplier = this.SupplierModel.findOneAndUpdate(
        { id },
        updateSupplierDto,
      ).exec();
      return updatedSupplier;
    } catch (error) {
      throw new HttpException(
        { title: 'Supplier Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  updateMany(updateSupplierDtos: UpdateSupplierDTO[]): Promise<any> {
    try {
      const bulkOps = updateSupplierDtos.map((updateData) => ({
        updateOne: {
          filter: { id: updateData.id },
          update: { $set: updateData },
        },
      }));
      return this.SupplierModel.bulkWrite(bulkOps);
    } catch (error) {
      throw new HttpException(
        { title: 'Suppliers Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Supplier> {
    try {
      const deletedSupplier = await this.SupplierModel.findOneAndDelete({
        id,
      }).exec();
      return deletedSupplier;
    } catch (error) {
      throw new HttpException(
        { title: 'Supplier Deletion Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private _mapRowToSupplier(row: any): CreateSupplierDTO | UpdateSupplierDTO {
    return {
      id: row['ID'] || '',
      name: row['Name'],
      primaryContact: {
        name: row['Primary Contact Name'],
        email: row['Primary Contact Email'],
        designation: row['Designation'] || '',
        phone: {
          code: row['Phone Code'] || '',
          number: row['Phone Number'] || '',
        },
      },
      website: row['Website'] || '',
      address: {
        addressLine1: row['Address Line 1'] || '',
        addressLine2: row['Address Line 2'] || '',
        townCity: row['Town/City'] || '',
        stateProvinceCounty: row['State/Province/County'] || '',
        country: row['Country'] || '',
        postalZipCode: row['Postal/Zip Code'] || '',
        mapsLink: row['Maps Link'] || '',
      },
      documents: this._parseDocuments(row['Documents']),
    };
  }

  private _parseDocuments(docString: string): { name: string; url: string }[] {
    if (!docString) return [];

    return docString.split(';').map((doc) => {
      const [name, url] = doc.split(':').map((part) => part.trim());
      return { name, url };
    });
  }

  async importSuppliers(file: Express.Multer.File): Promise<{
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

      const suppliersToInsert: CreateSupplierDTO[] = [];
      const suppliersToUpdate: UpdateSupplierDTO[] = [];

      for (const row of data) {
        const supplierData = this._mapRowToSupplier(row);

        if (supplierData.id) {
          suppliersToUpdate.push(supplierData);
        } else {
          suppliersToInsert.push(supplierData as CreateSupplierDTO);
        }
      }

      const [inserted, updated] = await Promise.all([
        this.createMany(suppliersToInsert),
        this.updateMany(suppliersToUpdate),
      ]);

      return {
        inserted: {
          count: inserted?.length || 0,
          names: inserted?.map((i) => i.name)?.join(', ') || '',
        },
        updated: { count: updated?.modifiedCount || 0 },
      };
    } catch (error) {
      throw new HttpException(
        { title: 'Suppliers Import Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
