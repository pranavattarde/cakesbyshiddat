import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { parseBoolean } from '../../common/transformers';
export class CreateGalleryDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() image: string;
  @IsString() @IsNotEmpty() categoryId: string;
  @IsOptional() @Type(() => Boolean) @IsBoolean() featured?: boolean;
}
export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {}
export class GalleryQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
}
export class CreateGalleryCategoryDto {
  @IsString() @IsNotEmpty() name: string;
}
