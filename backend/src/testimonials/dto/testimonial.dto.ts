import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { parseBoolean } from '../../common/transformers';
export class CreateTestimonialDto {
  @IsString() @IsNotEmpty() name: string;
  @IsOptional() @IsString() role?: string;
  @IsString() @IsNotEmpty() review: string;
  @Type(() => Number) @IsInt() @Min(1) @Max(5) rating: number;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @Type(() => Boolean) @IsBoolean() featured?: boolean;
}
export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}
export class TestimonialQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
}
