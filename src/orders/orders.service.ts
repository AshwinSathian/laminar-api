import { OrderItem } from '@laminar-api/interfaces';
import { Material, Order, OrderDocument, Supplier } from '@laminar-api/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly OrderModel: Model<OrderDocument>,
    @InjectModel(Material.name) private readonly MaterialModel: Model<Material>,
    @InjectModel(Supplier.name) private readonly SupplierModel: Model<Supplier>,
  ) {}

  async create(createOrderDto: CreateOrderDTO): Promise<Order> {
    try {
      const createdOrder = new this.OrderModel(createOrderDto);
      createdOrder.id = createdOrder.id || uuidv4();
      createdOrder.parts.forEach((item: OrderItem) => {
        item.id = item.id || uuidv4();
      });
      return await createdOrder.save();
    } catch (error) {
      throw new HttpException(
        { title: 'Order Creation Failed', details: `${error}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.OrderModel.find().populate('supplier').exec();
    } catch (error) {
      throw new HttpException(
        { title: 'Failed to Load Orders', details: `${error}` },
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
}
