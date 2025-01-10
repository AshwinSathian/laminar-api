import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillOfMaterialsModule } from './bill-of-materials/bill-of-materials.module';
import { InventoryModule } from './inventory/inventory.module';
import { MaterialsModule } from './materials/materials.module';
import { OrdersModule } from './orders/orders.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/laminar'),
    // MongooseModule.forRoot(
    //   'mongodb+srv://AshwinSathian:ARPMp12Dw5B8db1w@ashwinmongo.62iol.mongodb.net/laminar',
    // ),
    SuppliersModule,
    BillOfMaterialsModule,
    OrdersModule,
    MaterialsModule,
    InventoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
