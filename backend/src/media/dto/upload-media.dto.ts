import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UploadMediaDto {
  @IsOptional() @IsString() @MaxLength(100) folder?: string;
  @IsOptional() @IsString() @MaxLength(250) alt?: string;
}
