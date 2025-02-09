declare class AttachmentDTO {
    name: string;
    type: string;
    url: string;
}
export declare class PartDetailDTO {
    id: string;
    partNumber: string;
    name: string;
    description?: string;
    images?: AttachmentDTO[];
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
export declare class CreateBillOfMaterialsDTO {
    id?: string;
    productName: string;
    contactInfo: string;
    approvedBy: string;
    dateOfApproval: Date;
    partCount: number;
    totalCost: number;
    parts: PartDetailDTO[];
    currency: string;
}
export {};
