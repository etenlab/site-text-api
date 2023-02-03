import { ObjectType } from '@nestjs/graphql';
import { MutationPlaceholderOutput } from '../../../common/types';

@ObjectType()
export abstract class DeleteSiteTextTranslationOutput extends MutationPlaceholderOutput {}
