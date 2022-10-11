import { Module } from '@nestjs/common';
import { AppItemModule } from 'src/components/app-list/app-item.module';
import { DatabaseVersionControlService } from './database-version-control.service';
import { GenericResolver } from './generic.resolver';
import { PostgresService } from './postgres.service';

@Module({
  imports: [AppItemModule],
  providers: [PostgresService, DatabaseVersionControlService, GenericResolver],
  exports: [PostgresService, DatabaseVersionControlService, GenericResolver],
})
export class CoreModule {}
