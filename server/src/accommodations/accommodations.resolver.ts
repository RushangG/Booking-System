import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccommodationsService } from './accommodations.service';
import { Accommodation } from './entities/accommodation.entity';
import { CreateAccommodationInput } from './dto/create-accommodation.input';
import { UpdateAccommodationInput } from './dto/update-accommodation.input';

@Resolver(() => Accommodation)
export class AccommodationsResolver {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Mutation(() => Accommodation)
  createAccommodation(
    @Args('createAccommodationInput')
    createAccommodationInput: CreateAccommodationInput,
  ) {
    return this.accommodationsService.create(createAccommodationInput);
  }

  @Query(() => [Accommodation], { name: 'accommodations' })
  findAll(@Args('SearchLocation', { nullable: true }) searchLocation?: string) {
    return this.accommodationsService.findAll(searchLocation);
  }

  @Query(() => Accommodation, { name: 'accommodation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accommodationsService.findOne(id);
  }

  @Mutation(() => Accommodation)
  updateAccommodation(
    @Args('updateAccommodationInput')
    updateAccommodationInput: UpdateAccommodationInput,
  ) {
    return this.accommodationsService.update(
      updateAccommodationInput.id,
      updateAccommodationInput,
    );
  }

  @Mutation(() => Accommodation)
  removeAccommodation(@Args('id', { type: () => Int }) id: number) {
    return this.accommodationsService.remove(id);
  }
}
