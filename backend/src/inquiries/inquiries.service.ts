import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InquiryStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  PaginatedResponse,
  paginationMeta,
} from '../common/dto/pagination-query.dto';
import {
  CreateCustomerDto,
  CustomerDetailsDto,
  CustomerQueryDto,
  UpdateCustomerDto,
} from './dto/customer.dto';
import {
  CreateInquiryDto,
  InquiryMediaDto,
  InquiryQueryDto,
  UpdateInquiryDto,
} from './dto/inquiry.dto';

const inquiryInclude = {
  customer: true,
  cake: { include: { coverMedia: true } },
  inspirationImages: {
    orderBy: { displayOrder: 'asc' },
    include: { media: true },
  },
} satisfies Prisma.InquiryInclude;
type InquiryResult = Prisma.InquiryGetPayload<{
  include: typeof inquiryInclude;
}>;
type CustomerResult = Prisma.CustomerGetPayload<object>;
type DbClient = PrismaService | Prisma.TransactionClient;

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  private assertFutureEventDate(value: string | undefined): void {
    if (value && new Date(value).getTime() <= Date.now())
      throw new BadRequestException('Event date must be in the future');
  }
  private async customerOrThrow(
    id: string,
    db: DbClient = this.prisma,
  ): Promise<CustomerResult> {
    const customer = await db.customer.findUnique({ where: { id } });
    if (!customer) throw new BadRequestException('Customer not found');
    return customer;
  }
  private async cakeOrThrow(
    id: string,
    db: DbClient = this.prisma,
  ): Promise<void> {
    if (!(await db.cake.findUnique({ where: { id }, select: { id: true } })))
      throw new BadRequestException('Cake not found');
  }
  private async validateMedia(
    images: InquiryMediaDto[] | undefined,
    db: DbClient = this.prisma,
  ): Promise<void> {
    if (!images?.length) return;
    const ids = images.map(({ mediaId }) => mediaId);
    if ((await db.media.count({ where: { id: { in: ids } } })) !== ids.length)
      throw new BadRequestException(
        'One or more inspiration media items were not found',
      );
  }
  private async resolveCustomer(
    dto: CreateInquiryDto | UpdateInquiryDto,
    db: DbClient,
  ): Promise<string | undefined> {
    if (dto.customerId) {
      await this.customerOrThrow(dto.customerId, db);
      return dto.customerId;
    }
    if (!dto.customer) return undefined;
    const { phone, email } = dto.customer;
    const existing = await db.customer.findFirst({
      where: { OR: [{ phone }, ...(email ? [{ email }] : [])] },
    });
    if (existing) return existing.id;
    return (
      await db.customer.create({
        data: {
          name: dto.customer.name,
          phone,
          whatsapp: dto.customer.whatsapp || phone,
          email: email || null,
        },
      })
    ).id;
  }
  private async inquiryOrThrow(id: string): Promise<InquiryResult> {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id },
      include: inquiryInclude,
    });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    return inquiry;
  }

  async createCustomer(dto: CreateCustomerDto): Promise<CustomerResult> {
    try {
      return await this.prisma.customer.create({
        data: {
          name: dto.name,
          phone: dto.phone,
          whatsapp: dto.whatsapp || dto.phone,
          email: dto.email || null,
        },
      });
    } catch {
      throw new ConflictException(
        'A customer with this phone or email already exists',
      );
    }
  }
  async findAllCustomers(
    query: CustomerQueryDto,
  ): Promise<PaginatedResponse<CustomerResult>> {
    const where: Prisma.CustomerWhereInput = query.search
      ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' } },
            { phone: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
            { whatsapp: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {};
    const [data, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: query.sortOrder },
      }),
      this.prisma.customer.count({ where }),
    ]);
    return { data, meta: paginationMeta(query.page, query.limit, total) };
  }
  async findOneCustomer(id: string): Promise<CustomerResult> {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }
  async updateCustomer(
    id: string,
    dto: UpdateCustomerDto,
  ): Promise<CustomerResult> {
    await this.findOneCustomer(id);
    try {
      return await this.prisma.customer.update({ where: { id }, data: dto });
    } catch {
      throw new ConflictException(
        'A customer with this phone or email already exists',
      );
    }
  }
  async removeCustomer(id: string): Promise<void> {
    await this.findOneCustomer(id);
    try {
      await this.prisma.customer.delete({ where: { id } });
    } catch {
      throw new BadRequestException('Cannot delete a customer with inquiries');
    }
  }

  async create(dto: CreateInquiryDto): Promise<InquiryResult> {
    this.assertFutureEventDate(dto.eventDate);
    if (dto.deliveryType === 'HOME_DELIVERY' && !dto.deliveryAddress?.trim()) {
      throw new BadRequestException('Delivery address is required for home delivery');
    }
    return this.prisma.$transaction(async (tx) => {
      const customerId = await this.resolveCustomer(dto, tx);
      if (!customerId) throw new BadRequestException('Customer is required');
      if (dto.cakeId) await this.cakeOrThrow(dto.cakeId, tx);
      await this.validateMedia(dto.inspirationImages, tx);
      return tx.inquiry.create({
        data: {
          customerId,
          cakeId: dto.cakeId,
          eventType: dto.eventType,
          eventDate: new Date(dto.eventDate),
          deliveryType: dto.deliveryType,
          deliveryAddress: dto.deliveryAddress,
          deliveryTime: dto.deliveryTime,
          guestCount: dto.guestCount,
          weight: dto.weight,
          budget: dto.budget,
          eggOption: dto.eggOption,
          flavour: dto.flavour,
          message: dto.message,
          status: dto.status,
          priority: dto.priority,
          assignedTo: dto.assignedTo,
          quotationAmount: dto.quotationAmount,
          adminNotes: dto.adminNotes,
          inspirationImages: dto.inspirationImages
            ? { create: dto.inspirationImages }
            : undefined,
        },
        include: inquiryInclude,
      });
    });
  }
  async findAll(
    query: InquiryQueryDto,
  ): Promise<PaginatedResponse<InquiryResult>> {
    const where: Prisma.InquiryWhereInput = {
      ...(query.status ? { status: query.status } : {}),
      ...(query.priority ? { priority: query.priority } : {}),
      ...(query.cakeId ? { cakeId: query.cakeId } : {}),
      ...(query.customerId ? { customerId: query.customerId } : {}),
      ...(query.dateFrom || query.dateTo
        ? {
            eventDate: {
              ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
              ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              { eventType: { contains: query.search, mode: 'insensitive' } },
              { message: { contains: query.search, mode: 'insensitive' } },
              {
                customer: {
                  is: {
                    OR: [
                      { name: { contains: query.search, mode: 'insensitive' } },
                      {
                        phone: { contains: query.search, mode: 'insensitive' },
                      },
                      {
                        email: { contains: query.search, mode: 'insensitive' },
                      },
                    ],
                  },
                },
              },
            ],
          }
        : {}),
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.inquiry.findMany({
        where,
        include: inquiryInclude,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: query.sortOrder },
      }),
      this.prisma.inquiry.count({ where }),
    ]);
    return { data, meta: paginationMeta(query.page, query.limit, total) };
  }
  findOne(id: string): Promise<InquiryResult> {
    return this.inquiryOrThrow(id);
  }
  async update(id: string, dto: UpdateInquiryDto): Promise<InquiryResult> {
    const existing = await this.inquiryOrThrow(id);
    this.assertFutureEventDate(dto.eventDate);
    const deliveryType = dto.deliveryType ?? existing.deliveryType;
    const deliveryAddress = dto.deliveryAddress ?? existing.deliveryAddress;
    if (deliveryType === 'HOME_DELIVERY' && !deliveryAddress.trim()) {
      throw new BadRequestException('Delivery address is required for home delivery');
    }
    return this.prisma.$transaction(async (tx) => {
      const resolvedCustomerId = await this.resolveCustomer(dto, tx);
      if (dto.cakeId) await this.cakeOrThrow(dto.cakeId, tx);
      await this.validateMedia(dto.inspirationImages, tx);
      if (dto.inspirationImages !== undefined)
        await tx.inquiryMedia.deleteMany({ where: { inquiryId: id } });
      return tx.inquiry.update({
        where: { id },
        data: {
          customerId: resolvedCustomerId,
          cakeId: dto.cakeId,
          eventType: dto.eventType,
          eventDate: dto.eventDate ? new Date(dto.eventDate) : undefined,
          deliveryType: dto.deliveryType,
          deliveryAddress: dto.deliveryAddress,
          deliveryTime: dto.deliveryTime,
          guestCount: dto.guestCount,
          weight: dto.weight,
          budget: dto.budget,
          eggOption: dto.eggOption,
          flavour: dto.flavour,
          message: dto.message,
          status: dto.status,
          priority: dto.priority,
          assignedTo: dto.assignedTo,
          quotationAmount: dto.quotationAmount,
          adminNotes: dto.adminNotes,
          inspirationImages:
            dto.inspirationImages !== undefined
              ? { create: dto.inspirationImages }
              : undefined,
        },
        include: inquiryInclude,
      });
    });
  }
  async remove(id: string): Promise<void> {
    await this.inquiryOrThrow(id);
    await this.prisma.inquiry.delete({ where: { id } });
  }
  async dashboardCounts(): Promise<Record<InquiryStatus, number>> {
    const groups = await this.prisma.inquiry.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    const counts: Record<InquiryStatus, number> = {
      NEW: 0,
      CONTACTED: 0,
      QUOTED: 0,
      CONFIRMED: 0,
      IN_PROGRESS: 0,
      READY: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };
    groups.forEach((group) => {
      counts[group.status] = group._count._all;
    });
    return counts;
  }
}
