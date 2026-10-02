import { Module } from '@nestjs/common';
import { BookingStatusService } from './booking-status.service';
import { BookingStatusResolver } from './booking-status.resolver';
import { BookingStatus } from './entities/booking-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookingStatus])],
  providers: [BookingStatusResolver, BookingStatusService],
})
export class BookingStatusModule {}
