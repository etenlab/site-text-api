import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AppItem } from './app-item.dto';

@InputType()
export class AppItemInput {
  @Field(() => String) app_name: string;
}

@ObjectType()
export class AppItemOutput {
  @Field(() => AppItem)
  readonly appItem: AppItem;
}
