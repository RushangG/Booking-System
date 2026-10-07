import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { BookingsRepository } from './bookings.repository';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsResolver, BookingsService, BookingsRepository],
  exports: [BookingsService],
})
export class BookingsModule {}
