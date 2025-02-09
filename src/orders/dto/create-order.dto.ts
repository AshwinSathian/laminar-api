import { OrderStatus } from '@laminar-api/enums';
import { Attachment, Order, OrderItem } from '@laminar-api/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class AttachmentDTO implements Attachment {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  url: string;
}

class OrderItemDTO implements OrderItem {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [AttachmentDTO], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDTO)
  images?: AttachmentDTO[];

  @ApiProperty()
  @IsString()
  material: string;

  @ApiProperty()
  @IsString()
  manufacturingMethod: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsOptional()
  nonLinrary?: boolean;
}

export class CreateOrderDTO implements Order {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  referenceId?: string;

  @ApiProperty({ type: [OrderItemDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  parts: OrderItemDTO[];

  @ApiProperty({ required: false })
  @IsOptional()
  supplier?: { id: string; name: string };

  @ApiProperty()
  @IsDateString()
  orderDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: Date;

  @ApiProperty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsNumber()
  totalValue: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  invoice?: string;

  @ApiProperty({ type: [AttachmentDTO], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDTO)
  otherAttachments?: AttachmentDTO[];
}
