import { Module } from '@nestjs/common';
import { UsersHasRolesService } from './users_has_roles.service';
import { UsersHasRolesResolver } from './users_has_roles.resolver';

@Module({
  providers: [UsersHasRolesResolver, UsersHasRolesService],
})
export class UsersHasRolesModule {}
