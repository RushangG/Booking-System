import { Injectable } from '@nestjs/common';
import { CreateAccommodationInput } from './dto/create-accommodation.input';
import { UpdateAccommodationInput } from './dto/update-accommodation.input';

@Injectable()
export class AccommodationsService {
  create(createAccommodationInput: CreateAccommodationInput) {
    return 'This action adds a new accommodation';
  }

  findAll() {
    return `This action returns all accommodations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accommodation`;
  }

  update(id: number, updateAccommodationInput: UpdateAccommodationInput) {
    return `This action updates a #${id} accommodation`;
  }

  remove(id: number) {
    return `This action removes a #${id} accommodation`;
  }
}
