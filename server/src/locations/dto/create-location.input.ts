import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  address: string;
}
