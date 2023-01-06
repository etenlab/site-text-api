import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { SiteText } from './site-text.dto';

@InputType()
export class SiteTextInput {
  @Field(() => Int) app: number;
  @Field(() => String) site_text_key: string;
  @Field(() => String) description: string;
  @Field(() => String, { nullable: true }) language_table?: string;
  @Field(() => String) language_id: string;
}

@ObjectType()
export class SiteTextOutput {
  @Field(() => SiteText)
  readonly siteText: SiteText;
}
