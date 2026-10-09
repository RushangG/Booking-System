import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { UsersHasRoles } from '../users_has_roles/entities/users_has_roles.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    let existingUser = await this.usersRepo.findOneBy({
      email: createUserInput.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email ${createUserInput.email} already exists`,
      );
    }

    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    // Get the "User" role from the RolesService
    let role = await this.rolesService.findOneByName('User');
    let user = this.usersRepo.create(createUserInput);

    let savedUser = await this.usersRepo.save(user);

    let userRole = new UsersHasRoles();
    userRole.User = savedUser;
    userRole.Role = role;

    await this.usersRepo.manager.save(userRole);

    return savedUser;
  }

  findAll() {
    return this.usersRepo.find({
      relations: {
        usersHasRoles: {
          Role: {
            rolesHasPermissions: {
              Permission: true,
            },
          },
        },
        companiesHasUsers: {
          company: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    let user = await this.usersRepo.findOne({
      where: { id: id },
      relations: {
        usersHasRoles: {
          Role: {
            rolesHasPermissions: {
              Permission: true,
            },
          },
        },
        companiesHasUsers: {
          company: true,
        },
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    let user = await this.usersRepo.findOne({
      where: { email: email },

      relations: {
        usersHasRoles: {
          Role: {
            rolesHasPermissions: {
              Permission: true,
            },
          },
        },
      },
    });
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    let user = this.usersRepo.update(id, updateUserInput);
    let updatedUser = this.usersRepo.findOneBy({ id: id });
    return updatedUser;
  }

  async remove(id: number) {
    let user = await this.usersRepo.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else {
      return `User with ID ${id} has been deleted`;
    }
  }

  async resetPassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersRepo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepo.update(userId, { password: hashedNewPassword });

    return 'Password has been successfully updated';
  }

  async findUserNotInCompany(companyId: number) {
    const usersInCompany = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoin('user.companiesHasUsers', 'companiesHasUsers')
      .where('companiesHasUsers.companyId = :companyId', { companyId })
      .getMany();

    const userIds = usersInCompany.map((user) => user.id);

    const query = this.usersRepo.createQueryBuilder('user');
    if (userIds.length > 0) {
      query.where('user.id NOT IN (:...userIds)', {
        userIds,
      });
    }

    const usersNotInCompany = await query.getMany();

    return usersNotInCompany;
  }
}
