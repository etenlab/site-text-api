import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  SiteTextTranslationInput,
  SiteTextTranslationOutput,
} from './dto/create-site-text-translation.dto';
import { DeleteSiteTextTranslationOutput } from './dto/delete-site-text-translation.dto';
import { SiteTextTranslation } from './dto/site-text-translation.dto';
import { SiteTextTranslationService } from './site-text-translation.service';

@Resolver(SiteTextTranslation)
export class SiteTextTranslationResolver {
  constructor(private service: SiteTextTranslationService) {}

  @Mutation(() => SiteTextTranslationOutput)
  async createSiteTextTranslation(
    @Args('input') input: SiteTextTranslationInput,
  ): Promise<SiteTextTranslationOutput> {
    const siteTextTranslation = await this.service.create(input);
    return { siteTextTranslation };
  }

  @Query(() => SiteTextTranslation)
  async siteTextTranslation(
    @Args('id') id: number,
  ): Promise<SiteTextTranslationOutput> {
    return await this.service.read(id);
  }

  @Query(() => [SiteTextTranslation])
  async siteTextTranslations(@Args('siteTextId') siteTextId: number) {
    return await this.service.list(siteTextId);
  }

  @Mutation(() => DeleteSiteTextTranslationOutput)
  async deleteSiteTextTranslation(
    @Args('id') id: number,
  ): Promise<DeleteSiteTextTranslationOutput> {
    await this.service.delete(id);
    return { success: true };
  }
}
