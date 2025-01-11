import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50001000 }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png|application\/pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadResult = await this.s3Service.uploadFile(file);
    return {
      message: 'File uploaded successfully',
      ...uploadResult,
    };
  }
}
