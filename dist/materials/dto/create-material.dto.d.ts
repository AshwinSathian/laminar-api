declare class DimensionValueDTO {
    value: number;
    unit: string;
}
declare class DimensionsDTO {
    length: DimensionValueDTO;
    breadth: DimensionValueDTO;
    height: DimensionValueDTO;
}
declare class WeightDTO {
    value: number;
    unit: string;
}
export declare class CreateMaterialDTO {
    id?: string;
    partName: string;
    images?: string[];
    material: string;
    manufacturingMethod: string;
    drawings?: string[];
    dimensions?: DimensionsDTO;
    weight?: WeightDTO;
    dataSheets?: string[];
    suppliers?: any[];
}
export {};
