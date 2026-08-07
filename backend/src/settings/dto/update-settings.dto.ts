import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString() businessName?: string;
  @IsOptional() @IsString() tagline?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsUrl({ require_tld: false }) instagram?: string;
  @IsOptional() @IsUrl({ require_tld: false }) facebook?: string;
  @IsOptional() @IsUrl({ require_tld: false }) youtube?: string;
  @IsOptional() @IsString() heroTitle?: string;
  @IsOptional() @IsString() heroSubtitle?: string;
  @IsOptional() @IsString() heroButtonText?: string;
  @IsOptional() @IsString() footerText?: string;
  @IsOptional() @IsUrl({ require_tld: false }) googleMapsUrl?: string;
  @IsOptional() @IsString() seoTitle?: string;
  @IsOptional() @IsString() seoDescription?: string;
  @IsOptional() @IsUrl({ require_tld: false }) logoUrl?: string;
  @IsOptional() @IsUrl({ require_tld: false }) faviconUrl?: string;
}
