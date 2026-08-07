import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { parseBoolean } from '../../common/transformers';
export class ContactMessageQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  isRead?: boolean;
}
