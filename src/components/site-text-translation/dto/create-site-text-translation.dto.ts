import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { SiteTextTranslation } from './site-text-translation.dto';

@InputType()
export class SiteTextTranslationInput {
  @Field(() => Int) user_id: number;
  @Field(() => Int) site_text: number;
  @Field(() => String) site_text_translation: string;
  @Field(() => String, { nullable: true }) language_table?: string;
  @Field(() => Int, { nullable: true }) language_id?: number;
}

@ObjectType()
export class SiteTextTranslationOutput {
  @Field(() => SiteTextTranslation)
  readonly siteTextTranslation: SiteTextTranslation;
}
