import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerCompaniesService } from './customer-companies.service';
import { CustomerCompany } from './entities/customer-company.entity';
import { CreateCustomerCompanyInput } from './dto/create-customer-company.input';
import { UpdateCustomerCompanyInput } from './dto/update-customer-company.input';

@Resolver(() => CustomerCompany)
export class CustomerCompaniesResolver {
  constructor(
    private readonly customerCompaniesService: CustomerCompaniesService,
  ) {}

  @Mutation(() => [CustomerCompany])
  async assignCustomersToCompany(
    @Args('customerId', { type: () => Int }) customerId: number,
    @Args('companyIds', { type: () => String }) companyIds: string,
  ) {
    let parsedCompanyIds = companyIds
      .split(',')
      .map((id) => parseInt(id.trim(), 10));

    return await this.customerCompaniesService.assignCustomersToCompany(
      parsedCompanyIds,
      customerId,
    );
  }

  @Mutation(() => String)
  async removeCustomerFromCompany(
    @Args('companyId', { type: () => Int }) companyId: number,
    @Args('customerId', { type: () => Int }) customerId: number,
  ) {
    return await this.customerCompaniesService.removeCustomerFromCompany(
      companyId,
      customerId,
    );
  }

  @Mutation(() => CustomerCompany)
  createCustomerCompany(
    @Args('createCustomerCompanyInput')
    createCustomerCompanyInput: CreateCustomerCompanyInput,
  ) {
    return this.customerCompaniesService.create(createCustomerCompanyInput);
  }

  @Query(() => [CustomerCompany], { name: 'customerCompanies' })
  findAll() {
    return this.customerCompaniesService.findAll();
  }

  @Query(() => CustomerCompany, { name: 'customerCompany' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customerCompaniesService.findOne(id);
  }

  @Mutation(() => CustomerCompany)
  updateCustomerCompany(
    @Args('updateCustomerCompanyInput')
    updateCustomerCompanyInput: UpdateCustomerCompanyInput,
  ) {
    return this.customerCompaniesService.update(
      updateCustomerCompanyInput.id,
      updateCustomerCompanyInput,
    );
  }

  @Mutation(() => CustomerCompany)
  removeCustomerCompany(@Args('id', { type: () => Int }) id: number) {
    return this.customerCompaniesService.remove(id);
  }
}
