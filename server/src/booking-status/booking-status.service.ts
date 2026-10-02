import { Injectable } from '@nestjs/common';
import { CreateBookingStatusInput } from './dto/create-booking-status.input';
import { UpdateBookingStatusInput } from './dto/update-booking-status.input';

@Injectable()
export class BookingStatusService {
  create(createBookingStatusInput: CreateBookingStatusInput) {
    return 'This action adds a new bookingStatus';
  }

  findAll() {
    return `This action returns all bookingStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingStatus`;
  }

  update(id: number, updateBookingStatusInput: UpdateBookingStatusInput) {
    return `This action updates a #${id} bookingStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingStatus`;
  }
}
