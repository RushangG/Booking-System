import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatusService } from './booking-status.service';
import { BookingStatusResolver } from './booking-status.resolver';
import { BookingStatusRepository } from './booking-status.repository';
import { BookingStatus } from './entities/booking-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingStatus])],
  providers: [
    BookingStatusResolver,
    BookingStatusService,
    BookingStatusRepository,
  ],
  exports: [BookingStatusService],
})
export class BookingStatusModule {}
