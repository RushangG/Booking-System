import { Injectable } from '@nestjs/common';
import { CreateRolesHasPermissionInput } from './dto/create-roles_has_permission.input';
import { UpdateRolesHasPermissionInput } from './dto/update-roles_has_permission.input';

@Injectable()
export class RolesHasPermissionsService {
  create(createRolesHasPermissionInput: CreateRolesHasPermissionInput) {
    return 'This action adds a new rolesHasPermission';
  }

  findAll() {
    return `This action returns all rolesHasPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesHasPermission`;
  }

  update(id: number, updateRolesHasPermissionInput: UpdateRolesHasPermissionInput) {
    return `This action updates a #${id} rolesHasPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesHasPermission`;
  }
}
