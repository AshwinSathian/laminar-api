import { BillOfMaterialsService } from './bill-of-materials.service';
import { CreateBillOfMaterialsDTO } from './dto/create-bill-of-materials.dto';
import { UpdateBillOfMaterialsDTO } from './dto/update-bill-of-materials.dto';
export declare class BillOfMaterialsController {
    private readonly billofmaterialsService;
    constructor(billofmaterialsService: BillOfMaterialsService);
    create(createBillOfMaterialsDTO: CreateBillOfMaterialsDTO): Promise<import("../schemas").BillOfMaterials>;
    findAll(): Promise<import("../schemas").BillOfMaterials[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<import("../schemas").BillOfMaterials>;
    update(id: string, updateBillOfMaterialsDTO: UpdateBillOfMaterialsDTO): Promise<import("../schemas").BillOfMaterials>;
    remove(id: string): Promise<import("../schemas").BillOfMaterials>;
}
