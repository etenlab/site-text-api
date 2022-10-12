import { Module } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';
import { SiteTextRepository } from './site-text.repository';
import { SiteTextService } from './site-text.service';
import { SiteTextResolver } from './site-text.resolver';

@Module({
  providers: [
    SiteTextRepository,
    SiteTextService,
    SiteTextResolver,
    PostgresService,
  ],
  exports: [SiteTextService],
})
export class SiteTextModule {}
