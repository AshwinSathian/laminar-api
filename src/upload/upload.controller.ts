import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('upload')
export class UploadController {
  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(
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
    @Req() req: Request, // Inject the Request object
  ) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${file.filename}`;
    return { url: fileUrl, name: file.filename, type: file.mimetype };
  }
}
