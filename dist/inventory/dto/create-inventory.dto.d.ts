declare class AddressDTO {
    addressLine1: string;
    addressLine2?: string;
    townCity: string;
    stateProvinceCounty: string;
    country: string;
    postalZipCode: string;
    mapsLink?: string;
}
export declare class CreateInventoryDTO {
    id: string;
    itemId: string;
    description?: string;
    address?: AddressDTO;
    notes?: string;
}
export {};
