import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccommodationType } from './entities/accommodation-type.entity';

@Injectable()
export class AccommodationTypesRepository extends Repository<AccommodationType> {
  constructor(
    @InjectRepository(AccommodationType)
    private readonly accommodationTypeRepository: Repository<AccommodationType>,
  ) {
    super(
      accommodationTypeRepository.target,
      accommodationTypeRepository.manager,
    );
  }
}
