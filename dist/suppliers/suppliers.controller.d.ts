import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDTO): Promise<import("../schemas").Supplier>;
    importSuppliers(file: Express.Multer.File): Promise<any>;
    findAll(): Promise<import("../schemas").Supplier[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<import("../schemas").Supplier>;
    update(id: string, updateSupplierDto: UpdateSupplierDTO): Promise<import("../schemas").Supplier>;
    remove(id: string): Promise<import("../schemas").Supplier>;
}
