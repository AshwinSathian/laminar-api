import { Material, Supplier } from '@laminar-api/schemas';
import { Model } from 'mongoose';
import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';
export declare class MaterialsService {
    private MaterialModel;
    private SupplierModel;
    constructor(MaterialModel: Model<Material>, SupplierModel: Model<Supplier>);
    create(createMaterialDto: CreateMaterialDTO): Promise<Material>;
    findAll(): Promise<Material[]>;
    countAll(): Promise<number>;
    findSupplierMaterials(id: string): Promise<Material[]>;
    findOne(id: string): Promise<Material>;
    update(id: string, updateMaterialDto: UpdateMaterialDTO): Promise<Material>;
    remove(id: string): Promise<Material>;
    loadSuppliers(ids: string[]): Promise<Supplier[]>;
}
