import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccommodationTypeInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
