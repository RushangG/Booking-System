import { CreateCompaniesHasUserInput } from './create-companies-has-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompaniesHasUserInput extends PartialType(CreateCompaniesHasUserInput) {
  @Field(() => Int)
  id: number;
}
