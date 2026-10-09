import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompaniesHasUsersService } from './companies-has-users.service';
import { CompaniesHasUsers } from './entities/companies-has-users.entity';
import { CreateCompaniesHasUserInput } from './dto/create-companies-has-user.input';
import { UpdateCompaniesHasUserInput } from './dto/update-companies-has-user.input';

@Resolver(() => CompaniesHasUsers)
export class CompaniesHasUsersResolver {
  constructor(
    private readonly companiesHasUsersService: CompaniesHasUsersService,
  ) {}

  @Mutation(() => [CompaniesHasUsers])
  async assignUsersToCompany(
    @Args('companyId', { type: () => Int }) companyId: number,
    @Args('userId', { type: () => String }) userIds: string,
  ) {
    let parsedUserIds = userIds.split(',').map((id) => parseInt(id.trim(), 10));

    return await this.companiesHasUsersService.assignUsersToCompany(
      parsedUserIds,
      companyId,
    );
  }

  @Mutation(() => String)
  async removeUserFromCompany(
    @Args('companyId', { type: () => Int }) companyId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.companiesHasUsersService.removeUserFromCompany(
      companyId,
      userId,
    );
  }

  @Mutation(() => CompaniesHasUsers)
  createCompaniesHasUser(
    @Args('createCompaniesHasUserInput')
    createCompaniesHasUserInput: CreateCompaniesHasUserInput,
  ) {
    return this.companiesHasUsersService.create(createCompaniesHasUserInput);
  }

  @Query(() => [CompaniesHasUsers], { name: 'companiesHasUsers' })
  findAll() {
    return this.companiesHasUsersService.findAll();
  }

  @Query(() => CompaniesHasUsers, { name: 'companiesHasUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companiesHasUsersService.findOne(id);
  }

  @Mutation(() => CompaniesHasUsers)
  updateCompaniesHasUser(
    @Args('updateCompaniesHasUserInput')
    updateCompaniesHasUserInput: UpdateCompaniesHasUserInput,
  ) {
    return this.companiesHasUsersService.update(
      updateCompaniesHasUserInput.id,
      updateCompaniesHasUserInput,
    );
  }

  @Mutation(() => CompaniesHasUsers)
  removeCompaniesHasUser(@Args('id', { type: () => Int }) id: number) {
    return this.companiesHasUsersService.remove(id);
  }
}
