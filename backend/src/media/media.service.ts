import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponse, paginationMeta } from '../common/dto/pagination-query.dto';
import { CloudinaryService } from './cloudinary.service';
import { MediaQueryDto } from './dto/media-query.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import type { UploadedImageFile } from './media-file';

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService) {}

  validateFile(file: UploadedImageFile | undefined, maxBytes: number): asserts file is UploadedImageFile {
    if (!file) throw new BadRequestException('An image file is required');
    if (!allowedMimeTypes.has(file.mimetype)) throw new BadRequestException('Only JPEG, PNG, WEBP, and AVIF images are allowed');
    if (file.size > maxBytes) throw new BadRequestException(`Image must be smaller than ${maxBytes} bytes`);
  }

  async upload(file: UploadedImageFile, dto: UploadMediaDto) {
    const result = await this.cloudinary.upload(file, dto.folder?.trim() || 'cms');
    return this.prisma.media.create({ data: { publicId: result.public_id, url: result.url, secureUrl: result.secure_url, width: result.width, height: result.height, format: result.format, bytes: result.bytes, folder: result.folder || dto.folder?.trim() || 'cms', alt: dto.alt?.trim() || '' } });
  }

  async findAll(query: MediaQueryDto): Promise<PaginatedResponse<Prisma.MediaGetPayload<object>>> {
    const where: Prisma.MediaWhereInput = { ...(query.folder ? { folder: query.folder } : {}), ...(query.search ? { OR: [{ alt: { contains: query.search, mode: 'insensitive' } }, { publicId: { contains: query.search, mode: 'insensitive' } }, { format: { contains: query.search, mode: 'insensitive' } }] } : {}) };
    const [data, total] = await this.prisma.$transaction([this.prisma.media.findMany({ where, skip: (query.page - 1) * query.limit, take: query.limit, orderBy: { [query.sortBy]: query.sortOrder } }), this.prisma.media.count({ where })]);
    return { data, meta: paginationMeta(query.page, query.limit, total) };
  }

  async findOne(id: string) { const media = await this.prisma.media.findUnique({ where: { id } }); if (!media) throw new NotFoundException('Media not found'); return media; }
  async remove(id: string): Promise<void> { const media = await this.findOne(id); await this.cloudinary.destroy(media.publicId); await this.prisma.media.delete({ where: { id } }); }
}
