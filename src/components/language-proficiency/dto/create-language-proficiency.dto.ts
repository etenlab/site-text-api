import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  LanguageProficiency,
  LanguageProficiencyEnum,
} from './language-proficiency.dto';

@InputType()
export class LanguageProficiencyInput {
  @Field(() => String) user_id: string;
  @Field(() => LanguageProficiencyEnum) skill_level: LanguageProficiencyEnum;
  @Field(() => String) language_table: string;
  @Field(() => String) language_id: string;
}

@ObjectType()
export class LanguageProficiencyOutput {
  @Field(() => LanguageProficiency)
  readonly languageProficiency: LanguageProficiency;
}
