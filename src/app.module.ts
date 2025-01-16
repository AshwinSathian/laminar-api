import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillOfMaterialsModule } from './bill-of-materials';
import { InventoryModule } from './inventory';
import { MaterialsModule } from './materials';
import { OrdersModule } from './orders';
import { SuppliersModule } from './suppliers';
import { UploadModule } from './upload';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL') || process.env.MONGO_URL,
      }),
    }),
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
