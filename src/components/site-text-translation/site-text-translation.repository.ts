import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';
import { SiteTextTranslationInput } from './dto/create-site-text-translation.dto';

@Injectable()
export class SiteTextTranslationRepository {
  constructor(private pg: PostgresService) {}

  async create(input: SiteTextTranslationInput) {
    const res = await this.pg.pool.query(
      `
      INSERT INTO admin.site_text_translations(
        site_text, site_text_translation, description_translation, 
        user_id, language_table, language_id)
      VALUES($1, $2, $3, $4, $5, (SELECT id FROM iso_639_3 WHERE iso_639_3 = $6))
      RETURNING id, site_text, site_text_translation, user_id, 
      language_table, language_id;
      `,
      [
        input.site_text,
        input.site_text_translation,
        input.description_translation,
        input.user_id,
        input.language_table,
        input.language_id,
      ],
    );

    return res.rows[0];
  }

  async read(id: number) {
    const res = await this.pg.pool.query(
      `
      SELECT id, site_text, site_text_translation, 
      description_translation, user_id, language_table, language_id
      FROM admin.site_text_translations WHERE id = $1;
      `,
      [id],
    );

    if (!res.rows[0]) {
      throw new Error('Could not find site text translation');
    }

    return res.rows[0];
  }

  async list() {
    const res = await this.pg.pool.query(
      `
       SELECT id, site_text, site_text_translation, 
       description_translation, user_id, language_table, language_id
      FROM admin.site_text_translations;
      `,
      [],
    );

    return res.rows;
  }

  async delete(id: number) {
    return await this.pg.pool.query(
      `DELETE FROM admin.site_text_translations WHERE id = $1;`,
      [id],
    );
  }
}
