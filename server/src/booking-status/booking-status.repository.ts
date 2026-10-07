import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingStatus } from './entities/booking-status.entity';

@Injectable()
export class BookingStatusRepository extends Repository<BookingStatus> {
  constructor(
    @InjectRepository(BookingStatus)
    private readonly bookingStatusRepo: Repository<BookingStatus>,
  ) {
    super(bookingStatusRepo.target, bookingStatusRepo.manager);
  }
}

