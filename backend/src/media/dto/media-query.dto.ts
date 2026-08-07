import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class MediaQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() @MaxLength(100) folder?: string;
  @IsOptional() @IsIn(['createdAt', 'updatedAt', 'bytes', 'width', 'height']) sortBy: 'createdAt' | 'updatedAt' | 'bytes' | 'width' | 'height' = 'createdAt';
}
