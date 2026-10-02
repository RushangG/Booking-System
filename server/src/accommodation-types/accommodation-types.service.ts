import { Injectable } from '@nestjs/common';
import { CreateAccommodationTypeInput } from './dto/create-accommodation-type.input';
import { UpdateAccommodationTypeInput } from './dto/update-accommodation-type.input';

@Injectable()
export class AccommodationTypesService {
  create(createAccommodationTypeInput: CreateAccommodationTypeInput) {
    return 'This action adds a new accommodationType';
  }

  findAll() {
    return `This action returns all accommodationTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accommodationType`;
  }

  update(id: number, updateAccommodationTypeInput: UpdateAccommodationTypeInput) {
    return `This action updates a #${id} accommodationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} accommodationType`;
  }
}
