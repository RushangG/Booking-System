import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccommodationTypesService } from './accommodation-types.service';
import { AccommodationType } from './entities/accommodation-type.entity';
import { CreateAccommodationTypeInput } from './dto/create-accommodation-type.input';
import { UpdateAccommodationTypeInput } from './dto/update-accommodation-type.input';

@Resolver(() => AccommodationType)
export class AccommodationTypesResolver {
  constructor(private readonly accommodationTypesService: AccommodationTypesService) {}

  @Mutation(() => AccommodationType)
  createAccommodationType(@Args('createAccommodationTypeInput') createAccommodationTypeInput: CreateAccommodationTypeInput) {
    return this.accommodationTypesService.create(createAccommodationTypeInput);
  }

  @Query(() => [AccommodationType], { name: 'accommodationTypes' })
  findAll() {
    return this.accommodationTypesService.findAll();
  }

  @Query(() => AccommodationType, { name: 'accommodationType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accommodationTypesService.findOne(id);
  }

  @Mutation(() => AccommodationType)
  updateAccommodationType(@Args('updateAccommodationTypeInput') updateAccommodationTypeInput: UpdateAccommodationTypeInput) {
    return this.accommodationTypesService.update(updateAccommodationTypeInput.id, updateAccommodationTypeInput);
  }

  @Mutation(() => AccommodationType)
  removeAccommodationType(@Args('id', { type: () => Int }) id: number) {
    return this.accommodationTypesService.remove(id);
  }
}
