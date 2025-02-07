import { ConfigService } from '@nestjs/config';
export declare class S3Service {
    private configService;
    private s3;
    private bucketName;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File): Promise<{
        fileUrl: string;
        fileName: string;
        fileType: string;
    }>;
}
