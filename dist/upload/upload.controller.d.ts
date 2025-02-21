import { S3Service } from './s3.service';
export declare class UploadController {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(file: Express.Multer.File): Promise<{
        name: string;
        type: string;
        url: string;
    }>;
}
