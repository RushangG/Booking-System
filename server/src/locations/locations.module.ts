import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { LocationsRepository } from './locations.repository';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationsResolver, LocationsService, LocationsRepository],
  exports: [LocationsService],
})
export class LocationsModule {}
