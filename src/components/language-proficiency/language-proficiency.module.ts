import { Module } from '@nestjs/common';
import { LanguageProficiencyRepository } from './language-proficiency.repository';
import { LanguageProficiencyResolver } from './language-proficiency.resolver';
import { LanguageProficiencyService } from './language-proficiency.service';
import { PostgresService } from '../../core/postgres.service';

@Module({
  providers: [
    LanguageProficiencyRepository,
    LanguageProficiencyResolver,
    LanguageProficiencyService,
    PostgresService,
  ],
  exports: [LanguageProficiencyService],
})
export class LanguageProficiencyModule {}
