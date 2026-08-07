import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { CloudinaryService } from './cloudinary.service';
import { MediaService } from './media.service';

@Module({ controllers: [MediaController], providers: [MediaService, CloudinaryService] })
export class MediaModule {}
