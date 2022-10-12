import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SiteTextTranslation {
  @Field(() => Int) id: number;
  @Field(() => Int) site_text: number;
  @Field(() => String) site_text_translation: string;
  @Field(() => Int) user_id: number;
  @Field(() => String) language_table: string;
  @Field(() => Int) language_id: number;
}
