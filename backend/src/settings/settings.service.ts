import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const settings = await this.prisma.siteSetting.findFirst({ orderBy: { updatedAt: 'desc' } });
    return settings ?? this.prisma.siteSetting.create({ data: {} });
  }

  async update(dto: UpdateSettingsDto) {
    return this.prisma.$transaction(async (tx) => {
      const settings = await tx.siteSetting.findFirst({ orderBy: { updatedAt: 'desc' } });
      return settings
        ? tx.siteSetting.update({ where: { id: settings.id }, data: dto })
        : tx.siteSetting.create({ data: dto });
    });
  }
}
