import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../roles/entities/role.entity';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }


  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }


  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Mutation(() => String)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }


  @Query(() => [User], { name: 'usersNotInCompany' })
  findUserNotInCompany(@Args('companyId', { type: () => Int }) companyId: number) {
    return this.usersService.findUserNotInCompany(companyId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  resetPassword(
    @CurrentUser('Id') userId: number,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.usersService.resetPassword(userId, oldPassword, newPassword);
  }
}
