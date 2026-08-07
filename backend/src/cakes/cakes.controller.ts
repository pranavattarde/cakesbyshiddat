import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CakesService } from './cakes.service';
import {
  CreateCakeCategoryDto,
  CreateCakeDto,
  CakeCategoryQueryDto,
  CakeQueryDto,
  PublicCakeQueryDto,
  UpdateCakeCategoryDto,
  UpdateCakeDto,
} from './dto/cake.dto';

@ApiTags('Public Cakes')
@Controller('cakes/categories')
export class PublicCakeCategoriesController {
  constructor(private readonly service: CakesService) {}
  @Get()
  @ApiOperation({ summary: 'List active cake categories' })
  @ApiOkResponse({ description: 'Active categories ordered by display order.' })
  findAll() {
    return this.service.findPublicCategories();
  }
  @Get(':slug')
  @ApiOperation({ summary: 'Get an active category and its active cakes' })
  @ApiOkResponse({
    description: 'Category with published cakes ordered by display order.',
  })
  findOne(@Param('slug') slug: string) {
    return this.service.findPublicCategory(slug);
  }
}

@ApiTags('Public Cakes')
@Controller('cakes')
export class PublicCakesController {
  constructor(private readonly service: CakesService) {}
  @Get()
  @ApiOperation({ summary: 'Browse active cakes' })
  @ApiOkResponse({
    description: 'Published cakes with items, pagination, and total.',
  })
  findAll(@Query() query: PublicCakeQueryDto) {
    return this.service.findPublicAll(query);
  }
  @Get(':slug')
  @ApiOperation({ summary: 'Get an active cake by slug' })
  @ApiOkResponse({
    description:
      'Published cake with category, prices, flavours, gallery, SEO, and cover image.',
  })
  findOne(@Param('slug') slug: string) {
    return this.service.findPublicOne(slug);
  }
}

@ApiTags('Admin Cakes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/cakes')
export class CakesController {
  constructor(private readonly service: CakesService) {}
  @Get('categories')
  @ApiOperation({ summary: 'List cake categories for administration' })
  findCategories(@Query() query: CakeCategoryQueryDto) {
    return this.service.findAllCategories(query);
  }
  @Get() @ApiOperation({ summary: 'List cakes for administration' }) findAll(
    @Query() query: CakeQueryDto,
  ) {
    return this.service.findAll(query);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a cake for administration' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Post('categories')
  @ApiOperation({ summary: 'Create a cake category' })
  createCategory(@Body() dto: CreateCakeCategoryDto) {
    return this.service.createCategory(dto);
  }
  @Patch('categories/:id')
  @ApiOperation({ summary: 'Update a cake category' })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCakeCategoryDto) {
    return this.service.updateCategory(id, dto);
  }
  @Delete('categories/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an empty cake category' })
  removeCategory(@Param('id') id: string) {
    return this.service.removeCategory(id);
  }
  @Post() @ApiOperation({ summary: 'Create a cake' }) create(
    @Body() dto: CreateCakeDto,
  ) {
    return this.service.create(dto);
  }
  @Patch(':id') @ApiOperation({ summary: 'Update a cake' }) update(
    @Param('id') id: string,
    @Body() dto: UpdateCakeDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a cake' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
