import { OrderStatus } from '@laminar-api/enums';
import { FiltersPayload } from '@laminar-api/interfaces';
import { Material, Order, OrderDocument, Supplier } from '@laminar-api/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrdersGateway } from './orders.gateway';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly OrderModel: Model<OrderDocument>,
    @InjectModel(Material.name) private readonly MaterialModel: Model<Material>,
    @InjectModel(Supplier.name) private readonly SupplierModel: Model<Supplier>,
    private ordersGateway: OrdersGateway,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<Order> {
    try {
      const createdOrder = new this.OrderModel(createOrderDto);
      createdOrder.id = createdOrder.id || uuidv4();
      createdOrder.parts?.map((item) => {
        item.id = item.id || uuidv4();
      });

      return createdOrder.save();
    } catch (error) {
      throw new HttpException(
        { title: 'Order Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query = {}): Promise<Order[]> {
    try {
      return await this.OrderModel.find(query).populate('supplier').exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load Orders', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  countAll(): Promise<number> {
    try {
      return this.OrderModel.countDocuments().exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Count Orders', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findSupplierOrders(id: string): Promise<Order[]> {
    try {
      return this.OrderModel.find({ 'supplier.id': id }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Find Supplier Orders', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.OrderModel.findOne({ id })
        .populate('supplier')
        .exec();
      if (!order) {
        throw new HttpException(
          { title: 'Order Not Found', details: `No order found with id ${id}` },
          HttpStatus.NOT_FOUND,
        );
      }
      return order;
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Find Order', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDTO): Promise<Order> {
    try {
      updateOrderDto.parts?.map((item) => {
        item.id = item.id || uuidv4();
      });
      const updatedOrder = await this.OrderModel.findOneAndUpdate(
        { id },
        updateOrderDto,
        { new: true },
      )
        .populate('supplier')
        .exec();

      if (!updatedOrder) {
        throw new HttpException(
          { title: 'Order Not Found', details: `No order found with id ${id}` },
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.ordersGateway.emitOrderUpdate({
          orderId: id,
          updatedAt: new Date().toISOString(),
        });
      }

      return updatedOrder;
    } catch (error) {
      throw new HttpException(
        { title: 'Order Update Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      const deletedOrder = await this.OrderModel.findOneAndDelete({
        id,
      }).exec();
      if (!deletedOrder) {
        throw new HttpException(
          { title: 'Order Not Found', details: `No order found with id ${id}` },
          HttpStatus.NOT_FOUND,
        );
      }
      return deletedOrder;
    } catch (error) {
      throw new HttpException(
        { title: 'Order Deletion Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loadSuppliers(ids: string[]): Promise<Supplier[]> {
    try {
      return await this.SupplierModel.find({ id: { $in: ids } }).exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load Suppliers', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  _generateFilterQuery(listFilters: FiltersPayload) {
    const query = {};

    const statuses: OrderStatus[] = [];
    if (Object.values(listFilters?.status || {})?.some((s) => s)) {
      if (listFilters.status?.PLACED === 'true') {
        statuses.push(OrderStatus.placed);
      }
      if (listFilters.status?.DISPATCHED === 'true') {
        statuses.push(OrderStatus.dispatched);
      }
      if (listFilters.status?.DELIVERED === 'true') {
        statuses.push(OrderStatus.delivered);
      }
    }
    if (statuses?.length) {
      query['status'] = { $in: statuses };
    }

    if (listFilters?.date?.min) {
      query['orderDate'] = { $gte: new Date(listFilters.date.min) };
    }
    if (listFilters?.date?.max) {
      query['orderDate'] = { $lte: new Date(listFilters.date.max) };
    }

    if (listFilters?.value?.min) {
      query['totalValue'] = { $gte: listFilters?.value?.min };
    }
    if (listFilters?.value?.max) {
      query['totalValue'] = { $lte: listFilters?.value?.max };
    }

    return query;
  }

  async getFilterConstraints(): Promise<{
    statuses: OrderStatus[];
    oldest: Date;
    newest: Date;
    minValue: number;
    maxValue: number;
  }> {
    const constraints = await this.OrderModel.aggregate([
      {
        $facet: {
          statuses: [
            { $group: { _id: '$status' } }, // Find distinct statuses
            { $group: { _id: null, statuses: { $push: '$_id' } } }, // Collect all distinct statuses into an array
            { $project: { _id: 0, statuses: 1 } },
          ],
          orderDates: [
            {
              $group: {
                _id: null,
                oldest: { $min: '$orderDate' },
                newest: { $max: '$orderDate' },
              },
            },
            { $project: { _id: 0, oldest: 1, newest: 1 } },
          ],
          orderValues: [
            {
              $group: {
                _id: null,
                minValue: { $min: '$totalValue' },
                maxValue: { $max: '$totalValue' },
              },
            },
            { $project: { _id: 0, minValue: 1, maxValue: 1 } },
          ],
        },
      },
      {
        $project: {
          statuses: { $arrayElemAt: ['$statuses.statuses', 0] }, // Extract the array from the facet
          oldest: { $arrayElemAt: ['$orderDates.oldest', 0] },
          newest: { $arrayElemAt: ['$orderDates.newest', 0] },
          minValue: { $arrayElemAt: ['$orderValues.minValue', 0] },
          maxValue: { $arrayElemAt: ['$orderValues.maxValue', 0] },
        },
      },
    ]);

    return constraints[0]; // Return the first (and only) result
  }
}
