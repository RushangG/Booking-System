import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingStatusInput } from './dto/create-booking-status.input';
import { UpdateBookingStatusInput } from './dto/update-booking-status.input';
import { BookingStatusRepository } from './booking-status.repository';

@Injectable()
export class BookingStatusService {
  constructor(
    private readonly bookingStatusRepository: BookingStatusRepository,
  ) {}

  async create(createBookingStatusInput: CreateBookingStatusInput) {
    const bookingStatus = this.bookingStatusRepository.create(createBookingStatusInput);
    return this.bookingStatusRepository.save(bookingStatus);
  }

  findAll() {
    return this.bookingStatusRepository.find();
  }

  async findOne(id: number) {
    const bookingStatus = await this.bookingStatusRepository.findOneBy({ id });
    if (!bookingStatus) {
      throw new NotFoundException(`Booking status with ID ${id} not found`);
    }
    return bookingStatus;
  }

  async update(id: number, updateBookingStatusInput: UpdateBookingStatusInput) {
    const bookingStatus = await this.bookingStatusRepository.findOneBy({ id });
    if (!bookingStatus) {
      throw new NotFoundException(`Booking status with ID ${id} not found`);
    }
    await this.bookingStatusRepository.update(id, updateBookingStatusInput);
    return this.bookingStatusRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const bookingStatus = await this.bookingStatusRepository.findOneBy({ id });
    if (!bookingStatus) {
      throw new NotFoundException(`Booking status with ID ${id} not found`);
    }
    await this.bookingStatusRepository.delete(id);
    return bookingStatus;
  }
}
