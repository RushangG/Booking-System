import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accommodation } from './entities/accommodation.entity';

@Injectable()
export class AccommodationsRepository extends Repository<Accommodation> {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepo: Repository<Accommodation>,
  ) {
    super(accommodationRepo.target, accommodationRepo.manager);
  }
}

