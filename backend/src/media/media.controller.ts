import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MediaQueryDto } from './dto/media-query.dto';
import { UploadMediaDto } from './dto/upload-media.dto';
import { MediaService } from './media.service';
import type { UploadedImageFile } from './media-file';

const maxFileSize = Number(process.env.MEDIA_MAX_FILE_SIZE ?? 10 * 1024 * 1024);
const multerOptions = { limits: { fileSize: Number.isFinite(maxFileSize) && maxFileSize > 0 ? maxFileSize : 10 * 1024 * 1024 }, fileFilter: (_request: unknown, file: UploadedImageFile, callback: (error: Error | null, acceptFile: boolean) => void) => callback(file.mimetype.startsWith('image/') ? null : new BadRequestException('Only image files are allowed'), file.mimetype.startsWith('image/')) };

@ApiTags('Media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Post('upload') @ApiOperation({ summary: 'Upload one image' }) @ApiConsumes('multipart/form-data') @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' }, folder: { type: 'string' }, alt: { type: 'string' } }, required: ['file'] } }) @UseInterceptors(FileInterceptor('file', multerOptions))
  upload(@UploadedFile() file: UploadedImageFile | undefined, @Body() dto: UploadMediaDto) { this.service.validateFile(file, multerOptions.limits.fileSize); return this.service.upload(file, dto); }

  @Post('upload-many') @ApiOperation({ summary: 'Upload multiple images' }) @ApiConsumes('multipart/form-data') @ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } }, folder: { type: 'string' } }, required: ['files'] } }) @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  async uploadMany(@UploadedFiles() files: UploadedImageFile[] | undefined, @Body() dto: UploadMediaDto) { if (!files?.length) throw new BadRequestException('At least one image file is required'); files.forEach((file) => this.service.validateFile(file, multerOptions.limits.fileSize)); return Promise.all(files.map((file) => this.service.upload(file, dto))); }

  @Get() @ApiOperation({ summary: 'List media assets' }) findAll(@Query() query: MediaQueryDto) { return this.service.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get media metadata' }) findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiOperation({ summary: 'Delete image from Cloudinary and the media library' }) remove(@Param('id') id: string) { return this.service.remove(id); }
}
