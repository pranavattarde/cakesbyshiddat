import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CakesModule } from './cakes/cakes.module';
import { EventsModule } from './events/events.module';
import { GalleryModule } from './gallery/gallery.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { FaqsModule } from './faqs/faqs.module';
import { SettingsModule } from './settings/settings.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { MediaModule } from './media/media.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ContentModule } from './content/content.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (environment: Record<string, string | undefined>) => {
        const requiredVariables = ['DATABASE_URL', 'JWT_SECRET'];

        for (const variable of requiredVariables) {
          if (!environment[variable]) {
            throw new Error(`${variable} environment variable is required`);
          }
        }

        if (environment.NODE_ENV === 'production' && (environment.JWT_SECRET?.length ?? 0) < 32) {
          throw new Error('JWT_SECRET must contain at least 32 characters in production');
        }

        return environment;
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    PrismaModule,
    AuthModule,
    UsersModule,
    CakesModule,
    EventsModule,
    GalleryModule,
    TestimonialsModule,
    FaqsModule,
    SettingsModule,
    ContactMessagesModule,
    MediaModule,
    InquiriesModule,
    ContentModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
