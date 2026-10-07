import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccommodationInput } from './dto/create-accommodation.input';
import { UpdateAccommodationInput } from './dto/update-accommodation.input';
import { AccommodationsRepository } from './accommodations.repository';
import { Accommodation } from './entities/accommodation.entity';
import { AccommodationType } from '../accommodation-types/entities/accommodation-type.entity';
import { Location } from '../locations/entities/location.entity';

@Injectable()
export class AccommodationsService {
  constructor(
    @InjectRepository(AccommodationsRepository)
    private readonly accommodationRepo: AccommodationsRepository,
  ) {}

  async create(createAccommodationInput: CreateAccommodationInput) {
    const accommodation = new Accommodation();
    accommodation.name = createAccommodationInput.name;
    accommodation.description = createAccommodationInput.description;
    accommodation.price_per_night = createAccommodationInput.price_per_night;
    accommodation.type_id = { id: createAccommodationInput.type_id } as AccommodationType;
    accommodation.location_id = { id: createAccommodationInput.location_id } as Location;
    return this.accommodationRepo.save(accommodation);
  }

  async findAll() {
    return this.accommodationRepo.find({
      relations: {
        type_id: true,
        location_id: true,
      },
    });
  }

  async findOne(id: number) {
    const accommodation = await this.accommodationRepo.findOne({
      where: { id },
      relations: {
        type_id: true,
        location_id: true,
      },
    });
    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }
    return accommodation;
  }

  async update(id: number, updateAccommodationInput: UpdateAccommodationInput) {
    const accommodation = await this.accommodationRepo.findOneBy({ id });
    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }

    if (updateAccommodationInput.name !== undefined) {
      accommodation.name = updateAccommodationInput.name;
    }
    if (updateAccommodationInput.description !== undefined) {
      accommodation.description = updateAccommodationInput.description;
    }
    if (updateAccommodationInput.price_per_night !== undefined) {
      accommodation.price_per_night = updateAccommodationInput.price_per_night;
    }
    if (updateAccommodationInput.type_id !== undefined) {
      accommodation.type_id = { id: updateAccommodationInput.type_id } as AccommodationType;
    }
    if (updateAccommodationInput.location_id !== undefined) {
      accommodation.location_id = { id: updateAccommodationInput.location_id } as Location;
    }

    await this.accommodationRepo.save(accommodation);
    return this.findOne(id);
  }

  async remove(id: number) {
    const accommodation = await this.accommodationRepo.findOneBy({ id });
    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }
    await this.accommodationRepo.delete(id);
    return accommodation;
  }
}
