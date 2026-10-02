import { Module } from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { AccommodationsResolver } from './accommodations.resolver';
import { Accommodation } from './entities/accommodation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  providers: [AccommodationsResolver, AccommodationsService],
})
export class AccommodationsModule {} 
