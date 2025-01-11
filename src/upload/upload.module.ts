import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { S3Service } from './s3.service';
import * as multer from 'multer'; // Import multer

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Use in-memory storage
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, S3Service],
})
export class UploadModule {}
