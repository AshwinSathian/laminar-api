import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Use in-memory storage
    }),
  ],
  controllers: [UploadController],
  providers: [S3Service],
})
export class UploadModule {}
