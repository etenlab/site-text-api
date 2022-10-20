import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum LanguageProficiencyEnum {
  StartedLearning = '1',
  RecognizeWords = '2',
  Proficient = '3',
  Conversational = '4',
  Fluent = '5',
}

registerEnumType(LanguageProficiencyEnum, {
  name: 'LanguageProficiencyEnum',
});

@ObjectType()
export class LanguageProficiency {
  @Field(() => Int) id: number;
  @Field(() => String) user_id: string;
  @Field(() => String) language_table: string;
  @Field(() => Int) language_id: number;
  @Field(() => LanguageProficiencyEnum) skill_level: LanguageProficiencyEnum;
  @Field(() => String) ref_name: string;
}
