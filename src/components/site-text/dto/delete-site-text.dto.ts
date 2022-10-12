import { ObjectType } from '@nestjs/graphql';
import { MutationPlaceholderOutput } from 'src/common/types';

@ObjectType()
export abstract class DeleteSiteTextOutput extends MutationPlaceholderOutput {}
