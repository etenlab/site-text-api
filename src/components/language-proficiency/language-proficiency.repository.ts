import { Injectable } from '@nestjs/common';
import { PostgresService } from '../../core/postgres.service';
import { LanguageProficiencyInput } from './dto/create-language-proficiency.dto';

@Injectable()
export class LanguageProficiencyRepository {
  constructor(private pg: PostgresService) {}

  async create(input: LanguageProficiencyInput) {
    const res = await this.pg.pool.query(
      `
      INSERT INTO admin.language_skills(
        user_id, language_table, language_id, skill_level)
      VALUES($1, $2, (SELECT id FROM iso_639_3 WHERE iso_639_3 = $3), $4)
      RETURNING id, user_id, language_table, language_id, skill_level; 
      `,
      [
        input.user_id,
        input.language_table,
        input.language_id,
        input.skill_level,
      ],
    );

    return res.rows[0];
  }

  async read(id: number) {
    const res = await this.pg.pool.query(
      `
      SELECT ls.id, ls.user_id, ls.language_table, ls.language_id, 
              ls.skill_level, iso.ref_name 
      FROM admin.language_skills as ls
      JOIN iso_639_3 as iso ON ls.language_id = iso.id AND ls.id = $1;
      `,
      [id],
    );

    if (!res.rows[0]) {
      throw new Error('Could not find language proficiency');
    }

    return res.rows[0];
  }

  async list() {
    const res = await this.pg.pool.query(
      `
      SELECT ls.id, ls.user_id, ls.language_table, ls.language_id,
              ls.skill_level, iso.ref_name 
      FROM admin.language_skills as ls
      JOIN iso_639_3 as iso ON ls.language_id = iso.id;
      `,
    );

    return res.rows;
  }

  async listByUserid(userId: string) {
    const res = await this.pg.pool.query(
      `
      SELECT ls.id, ls.user_id, ls.language_table, ls.language_id,
              ls.skill_level, iso.ref_name 
      FROM admin.language_skills as ls
      JOIN iso_639_3 as iso ON ls.language_id = iso.id
      WHERE ls.user_id = $1;
      `,
      [userId],
    );

    return res.rows;
  }

  async delete(id: number) {
    return await this.pg.pool.query(
      `DELETE FROM admin.language_skills WHERE id = $1;`,
      [id],
    );
  }
}
