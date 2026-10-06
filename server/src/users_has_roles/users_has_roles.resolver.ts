import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersHasRolesService } from './users_has_roles.service';
import { UsersHasRoles } from './entities/users_has_roles.entity';
import { CreateUsersHasRoleInput } from './dto/create-users_has_role.input';
import { UpdateUsersHasRoleInput } from './dto/update-users_has_role.input';

@Resolver(() => UsersHasRoles)
export class UsersHasRolesResolver {
  constructor(private readonly usersHasRolesService: UsersHasRolesService) {}

  @Mutation(() => UsersHasRoles)
  createUsersHasRole(@Args('createUsersHasRoleInput') createUsersHasRoleInput: CreateUsersHasRoleInput) {
    return this.usersHasRolesService.create(createUsersHasRoleInput);
  }

  @Query(() => [UsersHasRoles], { name: 'usersHasRoles' })
  findAll() {
    return this.usersHasRolesService.findAll();
  }

  @Query(() => UsersHasRoles, { name: 'usersHasRole' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersHasRolesService.findOne(id);
  }

  @Mutation(() => UsersHasRoles)
  updateUsersHasRole(@Args('updateUsersHasRoleInput') updateUsersHasRoleInput: UpdateUsersHasRoleInput) {
    return this.usersHasRolesService.update(updateUsersHasRoleInput.id, updateUsersHasRoleInput);
  }

  @Mutation(() => UsersHasRoles)
  removeUsersHasRole(@Args('id', { type: () => Int }) id: number) {
    return this.usersHasRolesService.remove(id);
  }
}
