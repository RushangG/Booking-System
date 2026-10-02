import { CreateAccommodationTypeInput } from './create-accommodation-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccommodationTypeInput extends PartialType(CreateAccommodationTypeInput) {
  @Field(() => Int)
  id: number;
}
