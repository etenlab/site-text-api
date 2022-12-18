import { Injectable } from '@nestjs/common';
import { SiteTextTranslationInput } from './dto/create-site-text-translation.dto';
import { SiteTextTranslationRepository } from './site-text-translation.repository';

@Injectable()
export class SiteTextTranslationService {
  constructor(private repo: SiteTextTranslationRepository) {}

  async create(input: SiteTextTranslationInput) {
    try {
      const res = await this.repo.create(input);
      if (!res) {
        throw new Error('Could not create site text trasnlation');
      }

      return res;
    } catch (exception) {
      console.error(exception);
      throw new Error('Could not create site text translation');
    }
  }

  async read(id: number) {
    return await this.repo.read(id);
  }

  async list(siteTextId: number) {
    return await this.repo.list(siteTextId);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
