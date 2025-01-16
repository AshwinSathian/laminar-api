import { OrderStatus } from '@laminar-api/enums';
import { Supplier } from 'src/schemas/supplier.schema';
import { Base } from './base.interface';
import { Material } from './material.interface';

export interface OrderItem extends Base {
  part: Material;
  quantity: number;
  unitPrice: number;
  unitTax: number;
  currency: string;
}

export interface Order extends Base {
  parts: Material[];
  supplier: Supplier;
  orderDate: Date;
  status: OrderStatus;
  totalValue: number;
  currency: string;
  invoice?: string;
}
