import { Module } from '@nestjs/common';
import { PostgresService } from '../../core/postgres.service';
import { AppItemRepository } from './app-item.repository';
import { AppItemResolver } from './app-item.resolver';
import { AppItemService } from './app-item.service';

@Module({
  providers: [
    AppItemService,
    AppItemRepository,
    AppItemResolver,
    PostgresService,
  ],
  exports: [AppItemService],
})
export class AppItemModule {}
