import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerCompanyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
