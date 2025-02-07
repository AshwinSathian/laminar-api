import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(CreateInventoryDTO: CreateInventoryDTO): Promise<import("../schemas").Inventory>;
    importSuppliers(file: Express.Multer.File): Promise<any>;
    findAll(): Promise<import("../schemas").Inventory[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<import("../schemas").Inventory>;
    update(id: string, UpdateInventoryDTO: UpdateInventoryDTO): Promise<import("../schemas").Inventory>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas").Inventory> & import("../schemas").Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
