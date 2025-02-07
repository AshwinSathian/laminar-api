import { Inventory } from '@laminar-api/schemas';
import { Model } from 'mongoose';
import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';
export declare class InventoryService {
    private InventoryModel;
    constructor(InventoryModel: Model<Inventory>);
    create(CreateInventoryDTO: CreateInventoryDTO): Promise<Inventory>;
    createMany(createInventoryDtos: CreateInventoryDTO[]): Promise<Inventory[]>;
    findAll(): Promise<Inventory[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<Inventory>;
    update(id: string, UpdateInventoryDTO: UpdateInventoryDTO): Promise<Inventory>;
    updateMany(updateInventoryDtos: UpdateInventoryDTO[]): Promise<any>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Inventory> & Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    private _mapRowToInventory;
    importInventories(file: Express.Multer.File): Promise<{
        inserted: {
            count: number;
            names: string;
        };
        updated: {
            count: number;
        };
    }>;
}
