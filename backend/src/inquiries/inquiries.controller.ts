import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateInquiryDto, InquiryQueryDto, PublicCreateInquiryDto, UpdateInquiryDto } from './dto/inquiry.dto';
import { InquiriesService } from './inquiries.service';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Public Inquiries') @Controller('inquiries')
export class PublicInquiriesController {
  constructor(private readonly service: InquiriesService) {}
  @Post() @Throttle({ default: { limit: 5, ttl: 60_000 } }) @ApiOperation({ summary: 'Submit a public customer enquiry' }) create(@Body() dto: PublicCreateInquiryDto) { return this.service.create(dto); }
}

@ApiTags('Inquiries') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('inquiries')
export class InquiriesController {
  constructor(private readonly service: InquiriesService) {}
  @Post('admin') @ApiOperation({ summary: 'Create an administrative inquiry' }) create(@Body() dto: CreateInquiryDto) { return this.service.create(dto); }
  @Get('dashboard/counts') @ApiOperation({ summary: 'Get inquiry counts by status for dashboard cards' }) counts() { return this.service.dashboardCounts(); }
  @Get() @ApiOperation({ summary: 'List inquiries with filters' }) findAll(@Query() query: InquiryQueryDto) { return this.service.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get an inquiry' }) findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Update an inquiry; supplied inspiration images replace the collection' }) update(@Param('id') id: string, @Body() dto: UpdateInquiryDto) { return this.service.update(id, dto); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiOperation({ summary: 'Delete an inquiry' }) remove(@Param('id') id: string) { return this.service.remove(id); }
}
