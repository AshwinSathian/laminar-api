/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { Material } from 'src/schemas/material.schema';
import { Supplier } from 'src/schemas/supplier.schema';
import { CreateMaterialDTO } from './dto/create-material.dto';
import { UpdateMaterialDTO } from './dto/update-material.dto';
export declare class MaterialsService {
    private MaterialModel;
    private SupplierModel;
    constructor(MaterialModel: Model<Material>, SupplierModel: Model<Supplier>);
    create(createMaterialDto: CreateMaterialDTO): Promise<import("mongoose").Document<unknown, {}, Material> & Material & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<Material[]>;
    findSupplierMaterials(id: string): Promise<Material[]>;
    findOne(id: string): Promise<Material>;
    update(id: string, updateMaterialDto: UpdateMaterialDTO): Promise<Material>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Material> & Material & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    loadSuppliers(ids: string[]): Promise<Supplier[]>;
}
