import { OrderStatus } from '@laminar-api/enums';
import { Request } from 'express';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDTO): Promise<import("../schemas").Order>;
    findAll(req: Request): Promise<import("../schemas").Order[]>;
    getFilterMargins(): Promise<{
        statuses: OrderStatus[];
        oldest: Date;
        newest: Date;
        minValue: number;
        maxValue: number;
    }>;
    countAll(): Promise<number>;
    findSupplieOrders(id: string): Promise<import("../schemas").Order[]>;
    findOne(id: string): Promise<import("../schemas").Order>;
    update(id: string, updateOrderDto: UpdateOrderDTO): Promise<import("../schemas").Order>;
    remove(id: string): Promise<import("../schemas").Order>;
}
