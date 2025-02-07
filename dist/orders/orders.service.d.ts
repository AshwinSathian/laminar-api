import { OrderStatus } from '@laminar-api/enums';
import { FiltersPayload } from '@laminar-api/interfaces';
import { Material, Order, OrderDocument, Supplier } from '@laminar-api/schemas';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrdersGateway } from './orders.gateway';
export declare class OrdersService {
    private readonly OrderModel;
    private readonly MaterialModel;
    private readonly SupplierModel;
    private ordersGateway;
    constructor(OrderModel: Model<OrderDocument>, MaterialModel: Model<Material>, SupplierModel: Model<Supplier>, ordersGateway: OrdersGateway);
    create(createOrderDto: CreateOrderDTO): Promise<Order>;
    findAll(query?: {}): Promise<Order[]>;
    countAll(): Promise<number>;
    findSupplierOrders(id: string): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDTO): Promise<Order>;
    remove(id: string): Promise<Order>;
    loadSuppliers(ids: string[]): Promise<Supplier[]>;
    _generateFilterQuery(listFilters: FiltersPayload): {};
    getFilterConstraints(): Promise<{
        statuses: OrderStatus[];
        oldest: Date;
        newest: Date;
        minValue: number;
        maxValue: number;
    }>;
}
