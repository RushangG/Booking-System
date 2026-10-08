import { Inject, Injectable } from '@nestjs/common';
import { CreateUsersHasRoleInput } from './dto/create-users_has_role.input';
import { UpdateUsersHasRoleInput } from './dto/update-users_has_role.input';
import { UsersHasRolesRepository } from './users_has_roles.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersHasRolesService {
  constructor(
    @InjectRepository(UsersHasRolesRepository)
    private readonly usersHasRolesRepository: UsersHasRolesRepository,
  ) {}

  async assignRolesToUser(userId: number, roleIds: number[]) {
    // Delete existing roles 
    this.usersHasRolesRepository.delete({ User: { id: userId } });

    // Create new user-role associations
    const newUserRoles = roleIds.map((roleId) => {
      const newUserRole = this.usersHasRolesRepository.create({
        User: { id: userId },
        Role: { id: roleId },
      });
      return newUserRole;
    });

    // Save the new associations
    await this.usersHasRolesRepository.save(newUserRoles);

    let userRoles = await this.usersHasRolesRepository.find({
      where: { User: { id: userId } },
      relations: {
        User: true,
        Role: true,
      },
    });

    return userRoles;
  }

  create(createUsersHasRoleInput: CreateUsersHasRoleInput) {
    return 'This action adds a new usersHasRole';
  }

  findAll() {
    return `This action returns all usersHasRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersHasRole`;
  }

  update(id: number, updateUsersHasRoleInput: UpdateUsersHasRoleInput) {
    return `This action updates a #${id} usersHasRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersHasRole`;
  }
}
