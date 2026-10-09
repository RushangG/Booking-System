import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Query(() => [Permission], { name: 'permissions' })
  findAll() {
    return this.permissionsService.findAll();
  }
}
