import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { BookingsRepository } from './bookings.repository';
import { Booking } from './entities/booking.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Accommodation } from '../accommodations/entities/accommodation.entity';
import { BookingStatus } from '../booking-status/entities/booking-status.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingsRepository)
    private readonly bookingRepo: BookingsRepository,
  ) { }

  async create(createBookingInput: CreateBookingInput) {
    const booking = new Booking();
    booking.customer = { id: createBookingInput.customer_id } as Customer;
    booking.accommodation = { id: createBookingInput.accommodation_id } as Accommodation;
    booking.status = { id: createBookingInput.status_id } as BookingStatus;
    booking.check_in = createBookingInput.check_in;
    booking.check_out = createBookingInput.check_out;
    booking.created_by = createBookingInput.created_by ?? 1;
    return this.bookingRepo.save(booking);
  }

  async findAll(status?: number) {
    let query = this.bookingRepo.createQueryBuilder('booking');

    query.leftJoinAndSelect('booking.customer', 'customer');
    query.leftJoinAndSelect('booking.accommodation', 'accommodation');
    query.leftJoinAndSelect('booking.status', 'status');

    if (status !== null && status !== undefined) {
      query.where('status.id = :status', { status });
    }

    const bookings = await query.getMany();
    return bookings;

  }


  async findOne(id: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: {
        customer: true,
        accommodation: true,
        status: true,
      },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingInput: UpdateBookingInput) {
    const booking = await this.bookingRepo.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (updateBookingInput.customer_id !== undefined) {
      booking.customer = { id: updateBookingInput.customer_id } as Customer;
    }
    if (updateBookingInput.accommodation_id !== undefined) {
      booking.accommodation = { id: updateBookingInput.accommodation_id } as Accommodation;
    }
    if (updateBookingInput.status_id !== undefined) {
      booking.status = { id: updateBookingInput.status_id } as BookingStatus;
    }
    if (updateBookingInput.check_in !== undefined) {
      booking.check_in = updateBookingInput.check_in;
    }
    if (updateBookingInput.check_out !== undefined) {
      booking.check_out = updateBookingInput.check_out;
    }
    if (updateBookingInput.created_by !== undefined) {
      booking.created_by = updateBookingInput.created_by;
    }

    await this.bookingRepo.save(booking);
    return this.findOne(id);
  }

  async remove(id: number) {
    const booking = await this.bookingRepo.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    await this.bookingRepo.delete(id);
    return booking;
  }
}
