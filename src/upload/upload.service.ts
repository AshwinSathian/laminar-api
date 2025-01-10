import { Injectable } from '@nestjs/common';
import { put } from '@vercel/blob';

@Injectable()
export class UploadService {
  async uploadImage(file) {
    const blob = await put(file.name, file, {
      access: 'public',
    });

    return blob;
  }
}
