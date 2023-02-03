import { Injectable } from '@nestjs/common';
import { PostgresService } from '../../core/postgres.service';
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

  async list(siteTextId: number) {
    const res = await this.pg.pool.query(
      `
      SELECT COALESCE(stt.id, -1) AS id, 
      COALESCE(stt.site_text, st.id) as site_text, 
      COALESCE(stt.description_translation, st.description) as description_translation,
      COALESCE(stt.language_id, st.language_id) as language_id,
      COALESCE(stt.language_table, st.language_table) as language_table,
      COALESCE(stt.site_text_translation, st.site_text_key) as site_text_translation,
      COALESCE(stt.user_id, null) as user_id 
      FROM admin.site_text_translations as stt 
      FULL OUTER JOIN admin.site_text_keys as st ON st.id = stt.site_text
      WHERE st.id = $1;
      `,
      [siteTextId],
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
