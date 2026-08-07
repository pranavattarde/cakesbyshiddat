import { Module } from '@nestjs/common'; import { ContentController, PublicContentController } from './content.controller'; import { ContentService } from './content.service';
@Module({ controllers: [PublicContentController, ContentController], providers: [ContentService] }) export class ContentModule {}
