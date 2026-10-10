import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { LocationsRepository } from './locations.repository';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  async create(createLocationInput: CreateLocationInput) {
    const location = this.locationsRepository.create(createLocationInput);
    return this.locationsRepository.save(location);
  }

  findAll() {
    return this.locationsRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationsRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async update(id: number, updateLocationInput: UpdateLocationInput) {
    const location = await this.locationsRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    await this.locationsRepository.update(id, updateLocationInput);
    return this.locationsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const location = await this.locationsRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    await this.locationsRepository.delete(id);
    return `Location with ID ${id} has been deleted successfully.`;
  }
}
