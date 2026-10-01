import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  create(createRoleInput: CreateRoleInput) {
    const role = this.roleRepo.create(createRoleInput);
    return this.roleRepo.save(role);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: number) {
    return this.roleRepo.findOneBy({ id });
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    let role = this.roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    this.roleRepo.update({ id }, updateRoleInput);
    return this.roleRepo.findOneBy({ id });
  }

  remove(id: number) {
    let role = this.roleRepo.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    this.roleRepo.delete({ id });
    return `Role with ID ${id} has been deleted`;
  }
}
