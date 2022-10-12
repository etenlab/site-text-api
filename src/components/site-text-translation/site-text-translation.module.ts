import { Module } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';
import { SiteTextTranslationRepository } from './site-text-translation.repository';
import { SiteTextTranslationService } from './site-text-translation.service';
import { SiteTextTranslationResolver } from './site-text-translation.resolver';

@Module({
  providers: [
    SiteTextTranslationRepository,
    SiteTextTranslationService,
    SiteTextTranslationResolver,
    PostgresService,
  ],
  exports: [SiteTextTranslationService],
})
export class SiteTextTranslationModule {}
