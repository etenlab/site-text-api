import { Module } from '@nestjs/common';
import { AppItemModule } from 'src/components/app-list/app-item.module';
import { SiteTextTranslationModule } from 'src/components/site-text-translation/site-text-translation.module';
import { SiteTextModule } from 'src/components/site-text/site-text.module';
import { DatabaseVersionControlService } from './database-version-control.service';
import { GenericResolver } from './generic.resolver';
import { PostgresService } from './postgres.service';

@Module({
  imports: [AppItemModule, SiteTextModule, SiteTextTranslationModule],
  providers: [PostgresService, DatabaseVersionControlService, GenericResolver],
  exports: [PostgresService, DatabaseVersionControlService, GenericResolver],
})
export class CoreModule {}
