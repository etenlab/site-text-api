import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SiteTextTranslation {
  @Field(() => Int) id: number;
  @Field(() => Int) site_text: number;
  @Field(() => String) site_text_translation: string;
  @Field(() => String) user_id: string;
  @Field(() => String) language_table: string;
  @Field(() => Int) language_id: number;
}
