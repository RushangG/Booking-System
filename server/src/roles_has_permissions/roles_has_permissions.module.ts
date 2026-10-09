import { Module } from '@nestjs/common';
import { RolesHasPermissionsService } from './roles_has_permissions.service';
import { RolesHasPermissionsResolver } from './roles_has_permissions.resolver';
import { RolesHasPermissionsRepository } from './roles_has_permissions.repository';
import { RolesHasPermissions } from './entities/roles_has_permissions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesHasPermissions])],
  providers: [
    RolesHasPermissionsResolver,
    RolesHasPermissionsService,
    RolesHasPermissionsRepository,
  ],
})
export class RolesHasPermissionsModule {}
