import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateAccommodationInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  type_id: number;

  @Field(() => Int)
  location_id: number;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price_per_night: number;
}
