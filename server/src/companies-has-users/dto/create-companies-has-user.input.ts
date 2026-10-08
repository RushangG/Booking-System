import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompaniesHasUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
