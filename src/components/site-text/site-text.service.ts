import { Injectable } from '@nestjs/common';
import { SiteTextInput } from './dto/create-site-text.dto';
import { UpdateSiteTextInput } from './dto/update-site-text.dto';
import { SiteTextRepository } from './site-text.repository';

@Injectable()
export class SiteTextService {
  constructor(private repo: SiteTextRepository) {}

  async create(input: SiteTextInput) {
    try {
      const res = await this.repo.create(input);

      if (!res) {
        throw new Error('Could not create site text');
      }
      return res;
    } catch (exception) {
      console.log(exception);
      throw new Error('Could not create site text');
    }
  }

  async update(input: UpdateSiteTextInput) {
    if (input.description !== '' && input.site_text_key !== '') {
      return await this.repo.update(input);
    }

    return await this.repo.read(input.site_text_id);
  }

  async read(id: number) {
    return await this.repo.read(id);
  }

  async list() {
    return await this.repo.list();
  }

  async listByAppId(appId: number) {
    return await this.repo.listByAppId(appId);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}
