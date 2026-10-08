import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { UsersHasRoles } from './entities/users_has_roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersHasRolesRepository extends Repository<UsersHasRoles> {
  constructor(
    @InjectRepository(UsersHasRoles)
    private readonly usersHasRolesRepo: Repository<UsersHasRoles>,
  ) {
    super(usersHasRolesRepo.target, usersHasRolesRepo.manager);
  }
}
