import { BillOfMaterials } from '@laminar-api/schemas';
import { Model } from 'mongoose';
import { CreateBillOfMaterialsDTO } from './dto/create-bill-of-materials.dto';
import { UpdateBillOfMaterialsDTO } from './dto/update-bill-of-materials.dto';
export declare class BillOfMaterialsService {
    private BomModel;
    constructor(BomModel: Model<BillOfMaterials>);
    create(createBomDto: CreateBillOfMaterialsDTO): Promise<BillOfMaterials>;
    findAll(): Promise<BillOfMaterials[]>;
    countAll(): Promise<number>;
    findOne(id: string): Promise<BillOfMaterials>;
    update(id: string, updateBomDto: UpdateBillOfMaterialsDTO): Promise<BillOfMaterials>;
    remove(id: string): Promise<BillOfMaterials>;
}
