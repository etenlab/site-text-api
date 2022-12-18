import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';
import { SiteTextInput } from './dto/create-site-text.dto';
import { UpdateSiteTextInput } from './dto/update-site-text.dto';

@Injectable()
export class SiteTextRepository {
  constructor(private pg: PostgresService) {}

  async create(input: SiteTextInput) {
    const res = await this.pg.pool.query(
      `
      INSERT INTO admin.site_text_keys(
        app, site_text_key, description, language_id, language_table) 
      VALUES($1, $2, $3, (SELECT id FROM iso_639_3 WHERE iso_639_3 = $4), $5) 
      RETURNING id, app, site_text_key, description, language_id, language_table;
      `,
      [
        input.app,
        input.site_text_key,
        input.description,
        input.language_id,
        input.language_table,
      ],
    );

    return res.rows[0];
  }

  async read(id: number) {
    const res = await this.pg.pool.query(
      `
      SELECT id, app, site_text_key, description, language_id, language_table
      FROM admin.site_text_keys WHERE id = $1;
      `,
      [id],
    );

    if (!res.rows[0]) {
      throw new Error('Could not find site text');
    }

    return res.rows[0];
  }

  async update(input: UpdateSiteTextInput) {
    const res = await this.pg.pool.query(
      `
      UPDATE admin.site_text_keys SET description = $1, 
      site_text_key = $2 WHERE id = $3 RETURNING id;
      `,
      [input.description, input.site_text_key, input.site_text_id],
    );

    if (!res.rows[0]) {
      throw new Error('Could not find site text');
    }

    return this.read(input.site_text_id);
  }

  async list() {
    const res = await this.pg.pool.query(
      `
      SELECT id, app, site_text_key, description, language_id, language_table 
      FROM admin.site_text_keys;
      `,
    );

    return res.rows;
  }

  async listByAppId(appId: number) {
    const res = await this.pg.pool.query(
      `
      SELECT id, app, site_text_key, description, language_id, language_table
      FROM admin.site_text_keys WHERE app = $1;
      `,
      [appId],
    );

    return res.rows;
  }

  async delete(id: number) {
    await this.pg.pool.query(
      'DELETE FROM admin.site_text_keys WHERE id = $1;',
      [id],
    );
  }
}
