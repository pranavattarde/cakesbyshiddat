import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CakeStatus, EggOption } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { parseBoolean } from '../../common/transformers';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class CakePriceDto {
  @ApiProperty({ example: '1 kg' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  weight: string;
  @ApiProperty({ example: 899 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
}

export class CakeFlavorDto {
  @ApiProperty({ example: 'Chocolate truffle' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
}

export class CakeMediaDto {
  @ApiProperty() @IsString() @IsNotEmpty() mediaId: string;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
}

export class CreateCakeCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) name: string;
  @ApiProperty({ example: 'birthday-cakes' })
  @IsString()
  @Matches(slugPattern, {
    message: 'slug must be lowercase words separated by hyphens',
  })
  @MaxLength(120)
  slug: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  active?: boolean;
  @ApiPropertyOptional({ description: 'Media Library ID' })
  @IsOptional()
  @IsString()
  coverMediaId?: string;
}

export class UpdateCakeCategoryDto extends PartialType(CreateCakeCategoryDto) {}

export class CreateCakeDto {
  @ApiProperty() @IsString() @IsNotEmpty() categoryId: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(150) name: string;
  @ApiProperty({ example: 'chocolate-truffle-cake' })
  @IsString()
  @Matches(slugPattern, {
    message: 'slug must be lowercase words separated by hyphens',
  })
  @MaxLength(160)
  slug: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  shortDescription?: string;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  bestSeller?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  newArrival?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  trending?: boolean;
  @ApiPropertyOptional({ enum: EggOption })
  @IsOptional()
  @IsEnum(EggOption)
  eggOption?: EggOption;
  @ApiPropertyOptional({ enum: CakeStatus })
  @IsOptional()
  @IsEnum(CakeStatus)
  status?: CakeStatus;
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  displayOrder?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  seoTitle?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  seoDescription?: string;
  @ApiProperty({ description: 'Media Library ID' })
  @IsString()
  @IsNotEmpty()
  coverMediaId: string;
  @ApiPropertyOptional({ type: [CakePriceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CakePriceDto)
  prices?: CakePriceDto[];
  @ApiPropertyOptional({ type: [CakeFlavorDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CakeFlavorDto)
  flavors?: CakeFlavorDto[];
  @ApiPropertyOptional({ type: [CakeMediaDto] })
  @IsOptional()
  @IsArray()
  @ArrayUnique((item: CakeMediaDto) => item.mediaId)
  @ValidateNested({ each: true })
  @Type(() => CakeMediaDto)
  gallery?: CakeMediaDto[];
}

export class UpdateCakeDto extends PartialType(CreateCakeDto) {}

export class CakeCategoryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  active?: boolean;
  @ApiPropertyOptional({ enum: ['displayOrder', 'name', 'createdAt'] })
  @IsOptional()
  @IsEnum(['displayOrder', 'name', 'createdAt'])
  sortBy: 'displayOrder' | 'name' | 'createdAt' = 'displayOrder';
}

export class CakeQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional() @IsOptional() @IsString() categoryId?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
  @ApiPropertyOptional({ enum: CakeStatus })
  @IsOptional()
  @IsEnum(CakeStatus)
  status?: CakeStatus;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  newest?: boolean;
  @ApiPropertyOptional({ enum: ['displayOrder', 'createdAt', 'name'] })
  @IsOptional()
  @IsEnum(['displayOrder', 'createdAt', 'name'])
  sortBy: 'displayOrder' | 'createdAt' | 'name' = 'displayOrder';
}

export class PublicCakeQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Active category slug' })
  @IsOptional()
  @IsString()
  category?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  featured?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  bestSeller?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  trending?: boolean;
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  newArrival?: boolean;
  @ApiPropertyOptional({ enum: ['displayOrder', 'createdAt', 'name'] })
  @IsOptional()
  @IsEnum(['displayOrder', 'createdAt', 'name'])
  sort: 'displayOrder' | 'createdAt' | 'name' = 'displayOrder';
}
