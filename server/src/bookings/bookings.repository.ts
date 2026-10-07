import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsRepository extends Repository<Booking> {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {
    super(bookingRepo.target, bookingRepo.manager);
  }
}

