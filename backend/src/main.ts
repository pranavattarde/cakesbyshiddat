import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProduction = process.env.NODE_ENV === 'production';

  app.setGlobalPrefix('api');

  app.use(helmet());
  app.use(compression());

  const rawOrigins = process.env.CORS_ORIGINS ?? '*';
  const origins = rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);
  const allowAll = origins.includes('*') || rawOrigins === '*';

  app.enableCors({
    origin: allowAll ? true : origins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (!isProduction || process.env.ENABLE_SWAGGER === 'true') {
    const swaggerConfig = new DocumentBuilder()
    .setTitle('Cakes by Shiddat API')
    .setDescription('API documentation for administrator authentication.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, swaggerDocument);
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port, '0.0.0.0');

}

void bootstrap();
