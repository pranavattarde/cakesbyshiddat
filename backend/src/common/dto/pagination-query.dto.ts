import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
  limit = 10;

  @IsOptional() @IsString() @Transform(({ value }: { value: unknown }) => String(value).trim())
  search?: string;

  @IsOptional() @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}

export interface PaginatedResponse<T> { data: T[]; meta: { page: number; limit: number; total: number; totalPages: number }; }

export function paginationMeta(page: number, limit: number, total: number): PaginatedResponse<never>['meta'] {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}
