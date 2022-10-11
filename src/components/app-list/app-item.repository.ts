import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';

@Injectable()
export class AppItemRepository {
  constructor(private pg: PostgresService) {}

  async create(app_name: string) {
    const res = await this.pg.pool.query(
      'INSERT INTO app_list(app_name) VALUES($1) RETURNING id, app_name;',
      [app_name],
    );

    return res.rows[0];
  }

  async read(id: number) {
    const res = await this.pg.pool.query(
      'SELECT id, app_name FROM app_list WHERE id = $1;',
      [id],
    );

    if (!res.rows[0]) {
      throw new Error('Could not find app');
    }

    return res.rows[0];
  }

  async list() {
    const res = await this.pg.pool.query('SELECT id, app_name FROM app_list;');
    return res.rows;
  }

  async delete(id: number) {
    await this.pg.pool.query('DELETE FROM app_list WHERE id = $1', [id]);
  }
}
