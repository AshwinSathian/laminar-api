import { Supplier } from '@laminar-api/schemas';
import { Model } from 'mongoose';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';
export declare class SuppliersService {
    private SupplierModel;
    constructor(SupplierModel: Model<Supplier>);
    create(createSupplierDto: CreateSupplierDTO): Promise<Supplier>;
    createMany(createSupplierDtos: CreateSupplierDTO[]): Promise<Supplier[]>;
    findAll(): Promise<Supplier[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier>;
    updateMany(updateSupplierDtos: UpdateSupplierDTO[]): Promise<any>;
    remove(id: string): Promise<Supplier>;
    private _mapRowToSupplier;
    private _parseDocuments;
    importSuppliers(file: Express.Multer.File): Promise<{
        inserted: {
            count: number;
            names: string;
        };
        updated: {
            count: number;
        };
    }>;
}
