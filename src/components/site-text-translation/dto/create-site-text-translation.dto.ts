import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { SiteTextTranslation } from './site-text-translation.dto';

@InputType()
export class SiteTextTranslationInput {
  @Field(() => String) user_id: string;
  @Field(() => Int) site_text: number;
  @Field(() => String) site_text_translation: string;
  @Field(() => String) language_table: string;
  @Field(() => String) language_id: string;
}

@ObjectType()
export class SiteTextTranslationOutput {
  @Field(() => SiteTextTranslation)
  readonly siteTextTranslation: SiteTextTranslation;
}
