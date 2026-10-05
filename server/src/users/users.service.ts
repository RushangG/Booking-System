import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    let user = this.usersRepo.create(createUserInput);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find();
  }

  async findOne(id: number) {
    let user = await this.usersRepo.findOneBy({ id: id });
    return user;
  }

  async findByEmail(email: string) {
    let user = await this.usersRepo.findOneBy({ email: email });
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    let user = this.usersRepo.update(id, updateUserInput);
    return user;
  }

  async remove(id: number) {
    let user = await this.usersRepo.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else {
      return { message: `User with ID ${id} has been deleted` };
    }
  }
}
