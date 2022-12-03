import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateSiteTextInput {
  @Field(() => Int) site_text_id: number;
  @Field(() => String) site_text_key: string;
  @Field(() => String) description: string;
}
