import { HydratedDocument } from 'mongoose';
export type SupplierDocument = HydratedDocument<Supplier>;
export declare class Supplier {
    id: string;
    name: string;
    primaryContact: any;
    address?: any;
    website: string;
    documents: any[];
}
export declare const SupplierSchema: import("mongoose").Schema<Supplier, import("mongoose").Model<Supplier, any, any, any, import("mongoose").Document<unknown, any, Supplier> & Supplier & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Supplier, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Supplier>> & import("mongoose").FlatRecord<Supplier> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class SupplierEmbed {
    id: string;
    name: string;
    primaryContact: any;
    address?: any;
    website: string;
    documents: any[];
}
export declare const SupplierEmbedSchema: import("mongoose").Schema<SupplierEmbed, import("mongoose").Model<SupplierEmbed, any, any, any, import("mongoose").Document<unknown, any, SupplierEmbed> & SupplierEmbed & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SupplierEmbed, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SupplierEmbed>> & import("mongoose").FlatRecord<SupplierEmbed> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
