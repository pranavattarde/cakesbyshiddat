import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InquiriesService } from './inquiries.service';
import { CreateCustomerDto, CustomerQueryDto, UpdateCustomerDto } from './dto/customer.dto';

@ApiTags('Customers') @ApiBearerAuth() @UseGuards(JwtAuthGuard) @Controller('customers')
export class CustomersController {
  constructor(private readonly service: InquiriesService) {}
  @Post() @ApiOperation({ summary: 'Create a customer' }) create(@Body() dto: CreateCustomerDto) { return this.service.createCustomer(dto); }
  @Get() @ApiOperation({ summary: 'List customers' }) findAll(@Query() query: CustomerQueryDto) { return this.service.findAllCustomers(query); }
  @Get(':id') @ApiOperation({ summary: 'Get a customer' }) findOne(@Param('id') id: string) { return this.service.findOneCustomer(id); }
  @Patch(':id') @ApiOperation({ summary: 'Update a customer' }) update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) { return this.service.updateCustomer(id, dto); }
  @Delete(':id') @HttpCode(HttpStatus.NO_CONTENT) @ApiOperation({ summary: 'Delete a customer without inquiries' }) remove(@Param('id') id: string) { return this.service.removeCustomer(id); }
}
