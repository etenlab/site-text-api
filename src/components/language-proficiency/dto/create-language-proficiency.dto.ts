import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  LanguageProficiency,
  LanguageProficiencyEnum,
} from './language-proficiency.dto';

@InputType()
export class LanguageProficiencyInput {
  @Field(() => String) user_id: string;
  @Field(() => LanguageProficiencyEnum) skill_level: LanguageProficiencyEnum;
  @Field(() => String) language_table: string;
  @Field(() => Int) language_id: number;
}

@ObjectType()
export class LanguageProficiencyOutput {
  @Field(() => LanguageProficiency)
  readonly languageProficiency: LanguageProficiency;
}
