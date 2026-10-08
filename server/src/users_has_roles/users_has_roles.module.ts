import { Module } from '@nestjs/common';
import { UsersHasRolesService } from './users_has_roles.service';
import { UsersHasRolesResolver } from './users_has_roles.resolver';
import { UsersHasRolesRepository } from './users_has_roles.repository';
import { UsersHasRoles } from './entities/users_has_roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UsersHasRoles])],
  providers: [
    UsersHasRolesResolver,
    UsersHasRolesService,
    UsersHasRolesRepository,
  ],
})
export class UsersHasRolesModule {}
