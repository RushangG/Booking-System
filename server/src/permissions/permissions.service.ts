import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionsRepository } from './permissions.repository';
@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  findAll() {
    return this.permissionsRepository.find();
  }
}
