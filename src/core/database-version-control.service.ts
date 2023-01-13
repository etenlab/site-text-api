import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { PostgresService } from './postgres.service';

@Injectable()
export class DatabaseVersionControlService {
  constructor(private pg: PostgresService) {
    console.log('upserting site text procedures');
    this.upsert_procedures();
  }

  async upsert_procedures() {
    // load iso_639_3
    await this.runSqlFile('./src/core/sql/scripts/iso_639_3.sql');

    await this.runSqlFile('./src/core/sql/scripts/voting.sql');

    // load dummy data for showcase app
    await this.runSqlFile('./src/core/sql/scripts/showcase.sql');
  }

  async runSqlFile(path: string) {
    console.log('loading SQL:', path);
    const data = readFileSync(path, 'utf8');
    await this.pg.pool.query(data, []);
  }
}
