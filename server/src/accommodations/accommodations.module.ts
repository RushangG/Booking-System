import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationsService } from './accommodations.service';
import { AccommodationsResolver } from './accommodations.resolver';
import { AccommodationsRepository } from './accommodations.repository';
import { Accommodation } from './entities/accommodation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  providers: [AccommodationsResolver, AccommodationsService, AccommodationsRepository],
  exports: [AccommodationsService],
})
export class AccommodationsModule {}
