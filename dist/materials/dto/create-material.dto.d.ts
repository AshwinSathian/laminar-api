declare class DimensionsDTO {
    length: string;
    breadth: string;
    height: string;
}
export declare class CreateMaterialDTO {
    id?: string;
    partName: string;
    images?: string[];
    material: string;
    manufacturingMethod: string;
    drawings?: string[];
    dimensions?: DimensionsDTO;
    weight: string;
    dataSheets?: string[];
    suppliers?: string[];
}
export {};
