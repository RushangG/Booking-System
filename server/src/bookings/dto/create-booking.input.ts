import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  customer_id: number;

  @Field(() => Int)
  accommodation_id: number;

  @Field(() => Int)
  status_id: number;

  @Field(() => Date)
  check_in: Date;

  @Field(() => Date)
  check_out: Date;

  @Field(() => Int, { nullable: true })
  created_by?: number;
}
