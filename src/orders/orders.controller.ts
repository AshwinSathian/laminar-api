import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
  async findAll() {
    return this.ordersService.findAll();
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
