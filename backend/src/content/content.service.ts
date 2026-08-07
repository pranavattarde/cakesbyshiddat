import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto, UpdatePageDto } from './dto/content.dto';

const include = { heroMedia: true, sections: { orderBy: { displayOrder: 'asc' }, include: { media: true, items: { orderBy: { displayOrder: 'asc' }, include: { media: true } } } } } satisfies Prisma.PageInclude;
type PageResult = Prisma.PageGetPayload<{ include: typeof include }>;
@Injectable()
export class ContentService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}
  async onModuleInit(): Promise<void> { await this.prisma.$transaction(['home', 'about', 'services', 'events', 'gallery', 'contact'].map((slug, displayOrder) => this.prisma.page.upsert({ where: { slug }, update: {}, create: { slug, title: '', published: true, displayOrder } }))); }
  private async validateMedia(dto: CreatePageDto | UpdatePageDto): Promise<void> { const ids = [dto.heroMediaId, ...(dto.sections?.flatMap((section) => [section.mediaId, ...(section.items?.map((item) => item.mediaId) ?? [])]) ?? [])].filter((id): id is string => Boolean(id)); if (ids.length && await this.prisma.media.count({ where: { id: { in: ids } } }) !== new Set(ids).size) throw new BadRequestException('One or more media items were not found'); }
  async list(): Promise<PageResult[]> { return this.prisma.page.findMany({ include, orderBy: [{ displayOrder: 'asc' }, { slug: 'asc' }] }); }
  async get(id: string): Promise<PageResult> { const page = await this.prisma.page.findUnique({ where: { id }, include }); if (!page) throw new NotFoundException('Page not found'); return page; }
  async publicGet(slug: string): Promise<PageResult> { const page = await this.prisma.page.findFirst({ where: { slug, published: true }, include: { heroMedia: true, sections: { where: { active: true }, orderBy: { displayOrder: 'asc' }, include: { media: true, items: { where: { active: true }, orderBy: { displayOrder: 'asc' }, include: { media: true } } } } } }); if (!page) throw new NotFoundException('Published page not found'); return page; }
  async create(dto: CreatePageDto): Promise<PageResult> { await this.validateMedia(dto); try { return await this.prisma.page.create({ data: { ...dto, sections: dto.sections ? { create: dto.sections.map(({ items, ...section }) => ({ ...section, items: items ? { create: items } : undefined })) } : undefined }, include }); } catch { throw new BadRequestException('Page slug already exists'); } }
  async update(id: string, dto: UpdatePageDto): Promise<PageResult> { await this.get(id); await this.validateMedia(dto); try { return await this.prisma.$transaction(async (tx) => { if (dto.sections !== undefined) await tx.pageSection.deleteMany({ where: { pageId: id } }); return tx.page.update({ where: { id }, data: { ...dto, sections: dto.sections !== undefined ? { create: dto.sections.map(({ items, ...section }) => ({ ...section, items: items ? { create: items } : undefined })) } : undefined }, include }); }); } catch { throw new BadRequestException('Unable to update page'); } }
  async remove(id: string): Promise<void> { await this.get(id); await this.prisma.page.delete({ where: { id } }); }
}
