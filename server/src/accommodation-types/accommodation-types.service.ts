import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccommodationTypeInput } from './dto/create-accommodation-type.input';
import { UpdateAccommodationTypeInput } from './dto/update-accommodation-type.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccommodationType } from './entities/accommodation-type.entity';
import { AccommodationTypesRepository } from './accommodation-types.repository';
@Injectable()
export class AccommodationTypesService {
  constructor(
    private accommodationTypesRepository: AccommodationTypesRepository,
  ) {}

  create(createAccommodationTypeInput: CreateAccommodationTypeInput) {
    let accommodationType = this.accommodationTypesRepository.create(
      createAccommodationTypeInput,
    );
    return this.accommodationTypesRepository.save(accommodationType);
  }

  findAll() {
    return this.accommodationTypesRepository.find();
  }

  findOne(id: number) {
    let accommodationType = this.accommodationTypesRepository.findOneBy({
      id: id,
    });

    if (!accommodationType) {
      throw new NotFoundException(`Accommodation Type with ID ${id} not found`);
    }
  }

  update(
    id: number,
    updateAccommodationTypeInput: UpdateAccommodationTypeInput,
  ) {
    return `This action updates a #${id} accommodationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} accommodationType`;
  }
}
