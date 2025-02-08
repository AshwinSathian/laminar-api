import { HydratedDocument } from 'mongoose';
import { Supplier } from './supplier.schema';
export type MaterialDocument = HydratedDocument<Material>;
export declare class Material {
    id: string;
    partName: string;
    images?: any[];
    material: string;
    manufacturingMethod: string;
    drawings?: any[];
    dimensions?: Record<string, any>;
    weight?: Record<string, any>;
    dataSheets?: any[];
    suppliers?: Supplier[];
}
export declare const MaterialSchema: import("mongoose").Schema<Material, import("mongoose").Model<Material, any, any, any, import("mongoose").Document<unknown, any, Material> & Material & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Material, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Material>> & import("mongoose").FlatRecord<Material> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class MaterialEmbed {
    id: string;
    partName: string;
    images?: any[];
    material: string;
    manufacturingMethod: string;
    drawings?: any[];
    dimensions?: Record<string, any>;
    weight?: Record<string, any>;
    dataSheets?: any[];
}
export declare const MaterialEmbedSchema: import("mongoose").Schema<MaterialEmbed, import("mongoose").Model<MaterialEmbed, any, any, any, import("mongoose").Document<unknown, any, MaterialEmbed> & MaterialEmbed & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MaterialEmbed, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<MaterialEmbed>> & import("mongoose").FlatRecord<MaterialEmbed> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
