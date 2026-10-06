import { Injectable } from '@nestjs/common';
import { CreateUsersHasRoleInput } from './dto/create-users_has_role.input';
import { UpdateUsersHasRoleInput } from './dto/update-users_has_role.input';

@Injectable()
export class UsersHasRolesService {
  create(createUsersHasRoleInput: CreateUsersHasRoleInput) {
    return 'This action adds a new usersHasRole';
  }

  findAll() {
    return `This action returns all usersHasRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersHasRole`;
  }

  update(id: number, updateUsersHasRoleInput: UpdateUsersHasRoleInput) {
    return `This action updates a #${id} usersHasRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersHasRole`;
  }
}
