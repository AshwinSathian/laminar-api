import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(createMaterialDto: CreateMaterialDTO): Promise<import("../schemas").Material>;
    findAll(): Promise<import("../schemas").Material[]>;
    countAll(): Promise<number>;
    findSupplierMaterials(id: string): Promise<import("../schemas").Material[]>;
    findOne(id: string): Promise<import("../schemas").Material>;
    update(id: string, updateMaterialDto: UpdateMaterialDTO): Promise<import("../schemas").Material>;
    remove(id: string): Promise<import("../schemas").Material>;
}
