import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppItemService } from './app-item.service';
import { AppItem } from './dto/app-item.dto';
import { AppItemInput, AppItemOutput } from './dto/create-app-item.dto';
import { DeleteAppItemOutput } from './dto/delete-app-item.dto';

@Resolver(AppItem)
export class AppItemResolver {
  constructor(private service: AppItemService) {}

  @Mutation(() => AppItemOutput)
  async createAppItem(
    @Args('input') input: AppItemInput,
  ): Promise<AppItemOutput> {
    const appItem = await this.service.create(input);
    return { appItem };
  }

  @Query(() => AppItem)
  async appItem(@Args('id') id: number): Promise<AppItemOutput> {
    return await this.service.read(id);
  }

  @Query(() => [AppItem])
  async appItems(): Promise<AppItem[]> {
    return await this.service.list();
  }

  @Mutation(() => DeleteAppItemOutput)
  async deleteAppItem(@Args('id') id: number): Promise<DeleteAppItemOutput> {
    await this.service.delete(id);
    return { success: true };
  }
}
