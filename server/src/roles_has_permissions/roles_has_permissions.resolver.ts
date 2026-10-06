import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesHasPermissionsService } from './roles_has_permissions.service';
import { RolesHasPermissions } from './entities/roles_has_permissions.entity';
import { CreateRolesHasPermissionInput } from './dto/create-roles_has_permission.input';
import { UpdateRolesHasPermissionInput } from './dto/update-roles_has_permission.input';

@Resolver(() => RolesHasPermissions)
export class RolesHasPermissionsResolver {
  constructor(private readonly rolesHasPermissionsService: RolesHasPermissionsService) {}

  @Mutation(() => RolesHasPermissions)
  createRolesHasPermission(@Args('createRolesHasPermissionInput') createRolesHasPermissionInput: CreateRolesHasPermissionInput) {
    return this.rolesHasPermissionsService.create(createRolesHasPermissionInput);
  }

  @Query(() => [RolesHasPermissions], { name: 'rolesHasPermissions' })
  findAll() {
    return this.rolesHasPermissionsService.findAll();
  }

  @Query(() => RolesHasPermissions, { name: 'rolesHasPermission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesHasPermissionsService.findOne(id);
  }

  @Mutation(() => RolesHasPermissions)
  updateRolesHasPermission(@Args('updateRolesHasPermissionInput') updateRolesHasPermissionInput: UpdateRolesHasPermissionInput) {
    return this.rolesHasPermissionsService.update(updateRolesHasPermissionInput.id, updateRolesHasPermissionInput);
  }

  @Mutation(() => RolesHasPermissions)
  removeRolesHasPermission(@Args('id', { type: () => Int }) id: number) {
    return this.rolesHasPermissionsService.remove(id);
  }
}
