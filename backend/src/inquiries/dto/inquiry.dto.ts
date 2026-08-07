import { PartialType, PickType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { DeliveryType, EggOption, InquiryStatus, Priority } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CustomerDetailsDto } from './customer.dto';

export class InquiryMediaDto {
  @ApiProperty({ description: 'Media Library ID' }) @IsString() @IsNotEmpty() mediaId: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsInt() @Min(0) displayOrder?: number;
}

export class CreateInquiryDto {
  @ApiPropertyOptional({ description: 'Existing customer ID. Provide this or customer.' }) @IsOptional() @IsString() customerId?: string;
  @ApiPropertyOptional({ type: CustomerDetailsDto, description: 'Customer details used to find or create a customer.' }) @IsOptional() @ValidateNested() @Type(() => CustomerDetailsDto) customer?: CustomerDetailsDto;
  @ApiPropertyOptional() @IsOptional() @IsString() cakeId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(120) eventType: string;
  @ApiProperty({ format: 'date-time' }) @IsDateString() eventDate: string;
  @ApiProperty({ enum: DeliveryType }) @IsEnum(DeliveryType) deliveryType: DeliveryType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(500) deliveryAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) deliveryTime?: string;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(1) guestCount: number;
  @ApiProperty() @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) weight: number;
  @ApiProperty() @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) budget: number;
  @ApiPropertyOptional({ enum: EggOption }) @IsOptional() @IsEnum(EggOption) eggOption?: EggOption;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) flavour?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(5000) message?: string;
  @ApiPropertyOptional({ enum: InquiryStatus }) @IsOptional() @IsEnum(InquiryStatus) status?: InquiryStatus;
  @ApiPropertyOptional({ enum: Priority }) @IsOptional() @IsEnum(Priority) priority?: Priority;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(150) assignedTo?: string;
  @ApiPropertyOptional() @IsOptional() @Type(() => Number) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) quotationAmount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(5000) adminNotes?: string;
  @ApiPropertyOptional({ type: [InquiryMediaDto] }) @IsOptional() @IsArray() @ArrayUnique((item: InquiryMediaDto) => item.mediaId) @ValidateNested({ each: true }) @Type(() => InquiryMediaDto) inspirationImages?: InquiryMediaDto[];
}

export class PublicCreateInquiryDto extends PickType(CreateInquiryDto, ['customer', 'cakeId', 'eventType', 'eventDate', 'deliveryType', 'deliveryAddress', 'deliveryTime', 'guestCount', 'weight', 'budget', 'eggOption', 'flavour', 'message', 'inspirationImages'] as const) {
  @ApiProperty({ type: CustomerDetailsDto }) @IsDefined() @ValidateNested() @Type(() => CustomerDetailsDto) declare customer: CustomerDetailsDto;
}
export class UpdateInquiryDto extends PartialType(CreateInquiryDto) {}

export class InquiryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ format: 'date-time' }) @IsOptional() @IsDateString() dateFrom?: string;
  @ApiPropertyOptional({ format: 'date-time' }) @IsOptional() @IsDateString() dateTo?: string;
  @ApiPropertyOptional({ enum: InquiryStatus }) @IsOptional() @IsEnum(InquiryStatus) status?: InquiryStatus;
  @ApiPropertyOptional({ enum: Priority }) @IsOptional() @IsEnum(Priority) priority?: Priority;
  @ApiPropertyOptional() @IsOptional() @IsString() cakeId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customerId?: string;
}
