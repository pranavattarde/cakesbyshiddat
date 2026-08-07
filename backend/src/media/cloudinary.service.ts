import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import type { UploadedImageFile } from './media-file';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({ cloud_name: config.get<string>('CLOUDINARY_CLOUD_NAME'), api_key: config.get<string>('CLOUDINARY_API_KEY'), api_secret: config.get<string>('CLOUDINARY_API_SECRET') });
  }

  private assertConfigured(): void {
    if (!this.config.get<string>('CLOUDINARY_CLOUD_NAME') || !this.config.get<string>('CLOUDINARY_API_KEY') || !this.config.get<string>('CLOUDINARY_API_SECRET')) throw new InternalServerErrorException('Cloudinary is not configured');
  }

  upload(file: UploadedImageFile, folder: string): Promise<UploadApiResponse> {
    this.assertConfigured();
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error || !result) reject(new BadRequestException(error?.message ?? 'Image upload failed'));
        else resolve(result);
      });
      stream.end(file.buffer);
    });
  }

  async destroy(publicId: string): Promise<void> {
    this.assertConfigured();
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    if (result.result !== 'ok' && result.result !== 'not found') throw new BadRequestException('Image deletion failed');
  }
}
