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
    return `This action returns all users`;
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
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
