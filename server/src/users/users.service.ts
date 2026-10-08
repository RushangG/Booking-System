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
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    let user = this.usersRepo.create(createUserInput);
    return this.usersRepo.save(user);
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
}
