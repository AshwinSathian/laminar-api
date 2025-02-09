import { HydratedDocument } from 'mongoose';
import { Attachment } from 'src/interfaces/common.interface';
export type BillOfMaterialsDocument = HydratedDocument<BillOfMaterials>;
declare class PartDetail {
    id: string;
    partNumber: string;
    name: string;
    description?: string;
    images?: Attachment[];
    material: string;
    manufacturingMethod: string;
    quantity: number;
    nonLinrary?: boolean;
    supplierOrManufacturer?: {
        id: string;
        name: string;
    };
    unitCost: number;
    totalPartCost: number;
}
export declare class BillOfMaterials {
    id: string;
    productName: string;
    contactInfo: string;
    approvedBy: string;
    dateOfApproval: Date;
    partCount: number;
    totalCost: number;
    parts: PartDetail[];
    currency: string;
}
export declare const BillOfMaterialsSchema: import("mongoose").Schema<BillOfMaterials, import("mongoose").Model<BillOfMaterials, any, any, any, import("mongoose").Document<unknown, any, BillOfMaterials> & BillOfMaterials & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BillOfMaterials, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BillOfMaterials>> & import("mongoose").FlatRecord<BillOfMaterials> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
