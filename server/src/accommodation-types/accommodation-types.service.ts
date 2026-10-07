import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccommodationTypeInput } from './dto/create-accommodation-type.input';
import { UpdateAccommodationTypeInput } from './dto/update-accommodation-type.input';
import { AccommodationTypesRepository } from './accommodation-types.repository';

@Injectable()
export class AccommodationTypesService {
  constructor(
    private readonly accommodationTypesRepository: AccommodationTypesRepository,
  ) {}

  async create(createAccommodationTypeInput: CreateAccommodationTypeInput) {
    const type = this.accommodationTypesRepository.create(createAccommodationTypeInput);
    return this.accommodationTypesRepository.save(type);
  }

  findAll() {
    return this.accommodationTypesRepository.find();
  }

  async findOne(id: number) {
    const type = await this.accommodationTypesRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`Accommodation type with ID ${id} not found`);
    }
    return type;
  }

  async update(id: number, updateAccommodationTypeInput: UpdateAccommodationTypeInput) {
    const type = await this.accommodationTypesRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`Accommodation type with ID ${id} not found`);
    }
    await this.accommodationTypesRepository.update(id, updateAccommodationTypeInput);
    return this.accommodationTypesRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const type = await this.accommodationTypesRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`Accommodation type with ID ${id} not found`);
    }
    await this.accommodationTypesRepository.delete(id);
    return type;
  }
}
