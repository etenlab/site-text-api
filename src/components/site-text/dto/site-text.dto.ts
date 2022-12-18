import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SiteText {
  @Field(() => Int) id: number;
  @Field(() => Int) app: number;
  @Field(() => String) site_text_key: string;
  @Field(() => String) description: string;
  @Field(() => String) language_table: string;
  @Field(() => Int) language_id: number;
  @Field(() => Int) translations: number;
}
