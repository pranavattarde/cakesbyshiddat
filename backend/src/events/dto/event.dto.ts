import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { parseBoolean } from '../../common/transformers';
export class CreateEventDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() description: string;
  @IsString() @IsNotEmpty() coverImage: string;
  @IsString() @IsNotEmpty() categoryId: string;
  @IsOptional() @Type(() => Boolean) @IsBoolean() featured?: boolean;
}
export class UpdateEventDto extends PartialType(CreateEventDto) {}
export class EventQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
}
export class CreateEventCategoryDto {
  @IsString() @IsNotEmpty() name: string;
}
