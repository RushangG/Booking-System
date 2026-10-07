import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingStatusService } from './booking-status.service';
import { BookingStatus } from './entities/booking-status.entity';
import { CreateBookingStatusInput } from './dto/create-booking-status.input';
import { UpdateBookingStatusInput } from './dto/update-booking-status.input';

@Resolver(() => BookingStatus)
export class BookingStatusResolver {
  constructor(private readonly bookingStatusService: BookingStatusService) {}

  @Mutation(() => BookingStatus)
  createBookingStatus(@Args('createBookingStatusInput') createBookingStatusInput: CreateBookingStatusInput) {
    return this.bookingStatusService.create(createBookingStatusInput);
  }

  @Query(() => [BookingStatus], { name: 'bookingStatuses' })
  findAll() {
    return this.bookingStatusService.findAll();
  }

  @Query(() => BookingStatus, { name: 'bookingStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookingStatusService.findOne(id);
  }

  @Mutation(() => BookingStatus)
  updateBookingStatus(@Args('updateBookingStatusInput') updateBookingStatusInput: UpdateBookingStatusInput) {
    return this.bookingStatusService.update(updateBookingStatusInput.id, updateBookingStatusInput);
  }

  @Mutation(() => BookingStatus)
  removeBookingStatus(@Args('id', { type: () => Int }) id: number) {
    return this.bookingStatusService.remove(id);
  }
}
