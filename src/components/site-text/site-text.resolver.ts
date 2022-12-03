import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SiteTextInput, SiteTextOutput } from './dto/create-site-text.dto';
import { DeleteSiteTextOutput } from './dto/delete-site-text.dto';
import { SiteText } from './dto/site-text.dto';
import { UpdateSiteTextInput } from './dto/update-site-text.dto';
import { SiteTextService } from './site-text.service';

@Resolver(SiteText)
export class SiteTextResolver {
  constructor(private service: SiteTextService) {}

  @Mutation(() => SiteTextOutput)
  async createSiteText(
    @Args('input') input: SiteTextInput,
  ): Promise<SiteTextOutput> {
    const siteText = await this.service.create(input);
    return { siteText };
  }

  @Mutation(() => SiteTextOutput)
  async updateSiteText(@Args('input') input: UpdateSiteTextInput) {
    const siteText = await this.service.update(input);
    return { siteText };
  }

  @Query(() => SiteText)
  async siteText(@Args('id') id: number): Promise<SiteText> {
    return await this.service.read(id);
  }

  @Query(() => [SiteText])
  async siteTexts(): Promise<SiteText[]> {
    return await this.service.list();
  }

  @Query(() => [SiteText])
  async siteTextsByApp(@Args('id') appId: number): Promise<SiteText[]> {
    return await this.service.listByAppId(appId);
  }

  @Mutation(() => DeleteSiteTextOutput)
  async deleteSiteText(@Args('id') id: number): Promise<DeleteSiteTextOutput> {
    await this.service.delete(id);
    return { success: true };
  }
}
