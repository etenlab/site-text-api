import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  LanguageProficiencyInput,
  LanguageProficiencyOutput,
} from './dto/create-language-proficiency.dto';
import { DeleteLanguageProficiencyOutput } from './dto/delete-language-proficiency.dto';
import { LanguageProficiency } from './dto/language-proficiency.dto';
import { LanguageProficiencyService } from './language-proficiency.service';

@Resolver(LanguageProficiency)
export class LanguageProficiencyResolver {
  constructor(private service: LanguageProficiencyService) {}

  @Mutation(() => LanguageProficiencyOutput)
  async createLanguageProficiency(
    @Args('input') input: LanguageProficiencyInput,
  ): Promise<LanguageProficiencyOutput> {
    const languageProficiency = await this.service.create(input);
    return { languageProficiency };
  }

  @Query(() => LanguageProficiency)
  async languageProficiency(
    @Args('id') id: number,
  ): Promise<LanguageProficiencyOutput> {
    return await this.service.read(id);
  }

  @Query(() => [LanguageProficiency])
  async languageProficiencies(): Promise<LanguageProficiency[]> {
    return await this.service.list();
  }

  @Query(() => [LanguageProficiency])
  async languageProfienciesByUserId(
    @Args('user_id') user_id: string,
  ): Promise<LanguageProficiency[]> {
    return await this.service.listByUserid(user_id);
  }

  @Mutation(() => DeleteLanguageProficiencyOutput)
  async deleteLanguageProficiency(
    @Args('id') id: number,
  ): Promise<DeleteLanguageProficiencyOutput> {
    await this.service.delete(id);
    return { success: true };
  }
}
