import { CreateBookingStatusInput } from './create-booking-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookingStatusInput extends PartialType(CreateBookingStatusInput) {
  @Field(() => Int)
  id: number;
}

