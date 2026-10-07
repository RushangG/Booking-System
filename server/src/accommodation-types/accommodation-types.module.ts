import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationTypesService } from './accommodation-types.service';
import { AccommodationTypesResolver } from './accommodation-types.resolver';
import { AccommodationTypesRepository } from './accommodation-types.repository';
import { AccommodationType } from './entities/accommodation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationType])],
  providers: [AccommodationTypesResolver, AccommodationTypesService, AccommodationTypesRepository],
  exports: [AccommodationTypesService],
})
export class AccommodationTypesModule {}
