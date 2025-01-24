import { OrderStatus } from '@laminar-api/enums';
import { FiltersPayload } from '@laminar-api/interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBody({ type: CreateOrderDTO })
  async create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const listFilters: FiltersPayload = req?.listFilters;
    const query = this.ordersService._generateFilterQuery(listFilters);
    return this.ordersService.findAll(query);
  }

  @Get('/filter-constraints')
  getFilterMargins(): Promise<{
    statuses: OrderStatus[];
    oldest: Date;
    newest: Date;
    minValue: number;
    maxValue: number;
  }> {
    return this.ordersService.getFilterConstraints();
  }

  @Get('/count')
  countAll() {
    return this.ordersService.countAll();
  }

  @Get('supplier/:id')
  async findSupplieOrders(@Param('id') id: string) {
    return this.ordersService.findSupplierOrders(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateOrderDTO })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDTO,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
