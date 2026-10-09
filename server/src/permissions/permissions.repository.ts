import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository.target, permissionRepository.manager);
  }
}
