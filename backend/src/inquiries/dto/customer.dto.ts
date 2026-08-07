import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class CustomerDetailsDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(150) name: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(30) phone: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30) whatsapp?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
}

export class CreateCustomerDto extends CustomerDetailsDto {}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
export class CustomerQueryDto extends PaginationQueryDto {}
