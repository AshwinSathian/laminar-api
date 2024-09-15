declare class PhoneDTO {
    code: string;
    number: string;
}
declare class PrimaryContactDTO {
    name: string;
    email: string;
    designation?: string;
    phone: PhoneDTO;
}
declare class AddressDTO {
    addressLine1: string;
    addressLine2?: string;
    townCity: string;
    stateProvinceCounty: string;
    country: string;
    postalZipCode: string;
}
export declare class CreateSupplierDTO {
    id?: string;
    name: string;
    primaryContact: PrimaryContactDTO;
    address?: AddressDTO;
    website?: string;
    documents?: any[];
}
export {};
