import { CreateCustomerCompanyInput } from './create-customer-company.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerCompanyInput extends PartialType(CreateCustomerCompanyInput) {
  @Field(() => Int)
  id: number;
}
