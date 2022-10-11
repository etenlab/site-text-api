import { Injectable } from '@nestjs/common';
import { AppItemRepository } from './app-item.repository';
import { AppItemInput } from './dto/create-app-item.dto';

@Injectable()
export class AppItemService {
  constructor(private repo: AppItemRepository) {}

  async create(input: AppItemInput) {
    try {
      const res = await this.repo.create(input.app_name);
      if (!res) {
        throw new Error('Could not create app');
      }
      return res;
    } catch (exception) {
      console.error(exception);
      throw new Error('Could not create app');
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
