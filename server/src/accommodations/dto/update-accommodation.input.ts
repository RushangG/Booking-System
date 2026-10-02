import { CreateAccommodationInput } from './create-accommodation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccommodationInput extends PartialType(CreateAccommodationInput) {
  @Field(() => Int)
  id: number;
}
