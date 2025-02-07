export declare class PartDetailDTO {
    id: string;
    partNumber: string;
    partName: string;
    materialId: string;
    description?: string;
    partImages?: string[];
    quantity: number;
    units: string;
    supplierOrManufacturer?: any;
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
