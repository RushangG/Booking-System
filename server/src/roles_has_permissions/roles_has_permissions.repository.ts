import { Repository } from 'typeorm';
import { RolesHasPermissions } from './entities/roles_has_permissions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesHasPermissionsRepository extends Repository<RolesHasPermissions> {
  constructor(
    @InjectRepository(RolesHasPermissions)
    private readonly rolesHasPermissionsRepository: Repository<RolesHasPermissions>,
  ) {
    super(
      rolesHasPermissionsRepository.target,
      rolesHasPermissionsRepository.manager,
    );
  }
}
