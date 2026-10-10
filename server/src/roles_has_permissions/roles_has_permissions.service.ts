import { Injectable } from '@nestjs/common';
import { CreateRolesHasPermissionInput } from './dto/create-roles_has_permission.input';
import { UpdateRolesHasPermissionInput } from './dto/update-roles_has_permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesHasPermissionsRepository } from './roles_has_permissions.repository';

@Injectable()
export class RolesHasPermissionsService {
  constructor(
    @InjectRepository(RolesHasPermissionsRepository)
    private readonly rolesHasPermissionsRepo: RolesHasPermissionsRepository,
  ) { }

  async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
    // Delete existing permissions for the role
    await this.rolesHasPermissionsRepo.delete({ Role: { id: roleId } });



    // Create new permission-role
      const newRolesHasPermissions = permissionIds.map((permissionId) => {
        const newRoleHasPermission = this.rolesHasPermissionsRepo.create({
          Role: { id: roleId },
          Permission: { id: permissionId },
        });
        return newRoleHasPermission;
      });

      // Save the new associations
      await this.rolesHasPermissionsRepo.save(newRolesHasPermissions);
    
    let rolesHasPermissions = await this.rolesHasPermissionsRepo.find({
      where: { Role: { id: roleId } },
      relations: {
        Role: true,
        Permission: true,
      },
    });

    return rolesHasPermissions;
  }

  create(createRolesHasPermissionInput: CreateRolesHasPermissionInput) {
    return 'This action adds a new rolesHasPermission';
  }

  findAll() {
    return `This action returns all rolesHasPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolesHasPermission`;
  }

  update(
    id: number,
    updateRolesHasPermissionInput: UpdateRolesHasPermissionInput,
  ) {
    return `This action updates a #${id} rolesHasPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolesHasPermission`;
  }
}
