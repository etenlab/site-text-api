import { Injectable } from '@nestjs/common';
import { LanguageProficiencyInput } from './dto/create-language-proficiency.dto';
import { LanguageProficiencyRepository } from './language-proficiency.repository';

@Injectable()
export class LanguageProficiencyService {
  constructor(private readonly repo: LanguageProficiencyRepository) {}

  async create(input: LanguageProficiencyInput) {
    try {
      const res = await this.repo.create(input);
      if (!res) {
        throw new Error('Could not create language proficiency');
      }

      return res;
    } catch (exception) {
      console.error(exception);
      throw new Error('Could not create language proficiency');
    }
  }

  async read(id: number) {
    return await this.repo.read(id);
  }

  async list() {
    return await this.repo.list();
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
