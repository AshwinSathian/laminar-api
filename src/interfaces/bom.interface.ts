import { Supplier } from 'src/schemas/supplier.schema';
import { Base } from './base.interface';

export interface BillOfMaterials extends Base {
  productName: string;
  contactInfo: string;
  approvedBy: string;
  dateOfApproval: Date;
  partCount: number;
  totalCost: number;
  parts: PartDetail[];
  currency: string;
}

export interface PartDetail {
  partNumber: string;
  partName: string;
  materialId: string;
  description?: string;
  partImages?: string[];
  quantity: number;
  units: string;
  supplierOrManufacturer?: Supplier;
  unitCost: number;
  totalPartCost: number;
}
