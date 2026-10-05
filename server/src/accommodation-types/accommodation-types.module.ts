import { Module } from '@nestjs/common';
import { AccommodationTypesService } from './accommodation-types.service';
import { AccommodationTypesResolver } from './accommodation-types.resolver';
import { AccommodationType } from './entities/accommodation-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationTypesRepository } from './accommodation-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationType])],
  providers: [
    AccommodationTypesResolver,
    AccommodationTypesService,
    AccommodationTypesRepository,
  ],
})
export class AccommodationTypesModule {}
