import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsRepository extends Repository<Location> {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {
    super(locationRepo.target, locationRepo.manager);
  }
}

