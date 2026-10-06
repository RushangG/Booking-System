import { Module } from '@nestjs/common';
import { RolesHasPermissionsService } from './roles_has_permissions.service';
import { RolesHasPermissionsResolver } from './roles_has_permissions.resolver';

@Module({
  providers: [RolesHasPermissionsResolver, RolesHasPermissionsService],
})
export class RolesHasPermissionsModule {}
