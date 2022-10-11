import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppItem {
  @Field(() => Int) id: number;
  @Field(() => String) app_name: string;
}
