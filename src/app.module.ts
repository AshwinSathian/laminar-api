import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BomsModule } from './boms/boms.module';
import { OrdersModule } from './orders/orders.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MaterialsModule } from './materials/materials.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/laminar'),
    MongooseModule.forRoot(
      'mongodb+srv://AshwinSathian:ARPMp12Dw5B8db1w@ashwinmongo.62iol.mongodb.net/laminar',
    ),
    SuppliersModule,
    BomsModule,
    OrdersModule,
    MaterialsModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
