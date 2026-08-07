import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { InquiriesController, PublicInquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';

@Module({ controllers: [CustomersController, PublicInquiriesController, InquiriesController], providers: [InquiriesService] })
export class InquiriesModule {}
