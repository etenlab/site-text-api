import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/core/postgres.service';
import { LanguageProficiencyInput } from './dto/create-language-proficiency.dto';

@Injectable()
export class LanguageProficiencyRepository {
  constructor(private pg: PostgresService) {}

  async create(input: LanguageProficiencyInput) {
    const res = await this.pg.pool.query(
      `
      INSERT INTO language_skills(
        user_id, language_table, language_id, skill_level)
      VALUES($1, $2, $3, $4)
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
      SELECT id, user_id, language_table, language_id, skill_level
      FROM language_skills WHERE id = $1;
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
      SELECT id, user_id, language_table, language_id, skill_level
      FROM language_skills;
      `,
    );

    return res.rows;
  }

  async delete(id: number) {
    return await this.pg.pool.query(
      `DELETE FROM language_skills WHERE id = $1;`,
      [id],
    );
  }
}
