import { Module } from '@nestjs/common'; import { CakesController, PublicCakeCategoriesController, PublicCakesController } from './cakes.controller'; import { CakesService } from './cakes.service';
@Module({ controllers: [PublicCakeCategoriesController, PublicCakesController, CakesController], providers: [CakesService] }) export class CakesModule {}
