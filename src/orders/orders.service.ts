import {
  Order,
  OrderDocument,
  Supplier,
  SupplierDocument,
} from '@laminar-api/schemas';
import {
  CreateOrderInput,
  FiltersPayload,
  OrderFilterConstraints,
  UpdateOrderInput,
} from '@laminar-api/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    try {
      const { supplierId, parts, ...orderData } = createOrderInput;

      // Fetch supplier
      const supplier = await this.supplierModel
        .findOne({ id: supplierId })
        .exec();
      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }

      const createdOrder = new this.orderModel({
        ...orderData,
        id: uuidv4(),
        supplier,
        parts: parts.map((part) => ({ ...part, id: uuidv4() })),
      });

      return createdOrder.save();
    } catch (error) {
      throw new HttpException(
        `Order creation failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filters: FiltersPayload = {}): Promise<Order[]> {
    try {
      const query: any = {};

      if (filters.status) {
        query.status = {
          $in: Object.keys(filters.status).filter(
            (key) => filters.status[key] === 'true',
          ),
        };
      }

      if (filters.date?.min || filters.date?.max) {
        query.orderDate = {};
        if (filters.date.min) query.orderDate.$gte = new Date(filters.date.min);
        if (filters.date.max) query.orderDate.$lte = new Date(filters.date.max);
      }

      if (filters.value?.min || filters.value?.max) {
        query.totalValue = {};
        if (filters.value.min) query.totalValue.$gte = filters.value.min;
        if (filters.value.max) query.totalValue.$lte = filters.value.max;
      }

      return await this.orderModel.find(query).populate('supplier').exec();
    } catch (error) {
      throw new HttpException(
        `Failed to load orders: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async countAllOrders(): Promise<number> {
    return this.orderModel.countDocuments().exec();
  }

  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderModel
        .findOne({ id })
        .populate('supplier')
        .exec();
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException(
        `Failed to find order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateOrderInput: UpdateOrderInput): Promise<Order> {
    try {
      const updatedOrder = await this.orderModel
        .findOneAndUpdate({ id }, updateOrderInput, { new: true })
        .populate('supplier')
        .exec();

      if (!updatedOrder) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }

      return updatedOrder;
    } catch (error) {
      throw new HttpException(
        `Order update failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      const deletedOrder = await this.orderModel
        .findOneAndDelete({ id })
        .exec();
      if (!deletedOrder) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return deletedOrder;
    } catch (error) {
      throw new HttpException(
        `Order deletion failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFilterConstraints(): Promise<OrderFilterConstraints> {
    const constraints = await this.orderModel.aggregate([
      {
        $facet: {
          statuses: [
            { $group: { _id: '$status' } }, // Get distinct statuses
            { $group: { _id: null, statuses: { $push: '$_id' } } },
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
          statuses: { $arrayElemAt: ['$statuses.statuses', 0] },
          oldest: { $arrayElemAt: ['$orderDates.oldest', 0] },
          newest: { $arrayElemAt: ['$orderDates.newest', 0] },
          minValue: { $arrayElemAt: ['$orderValues.minValue', 0] },
          maxValue: { $arrayElemAt: ['$orderValues.maxValue', 0] },
        },
      },
    ]);

    return constraints[0]; // Return the single aggregated result
  }
}
