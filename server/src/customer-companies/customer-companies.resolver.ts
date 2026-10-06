import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerCompaniesService } from './customer-companies.service';
import { CustomerCompany } from './entities/customer-company.entity';
import { CreateCustomerCompanyInput } from './dto/create-customer-company.input';
import { UpdateCustomerCompanyInput } from './dto/update-customer-company.input';

@Resolver(() => CustomerCompany)
export class CustomerCompaniesResolver {
  constructor(private readonly customerCompaniesService: CustomerCompaniesService) {}

  @Mutation(() => CustomerCompany)
  createCustomerCompany(@Args('createCustomerCompanyInput') createCustomerCompanyInput: CreateCustomerCompanyInput) {
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
  updateCustomerCompany(@Args('updateCustomerCompanyInput') updateCustomerCompanyInput: UpdateCustomerCompanyInput) {
    return this.customerCompaniesService.update(updateCustomerCompanyInput.id, updateCustomerCompanyInput);
  }

  @Mutation(() => CustomerCompany)
  removeCustomerCompany(@Args('id', { type: () => Int }) id: number) {
    return this.customerCompaniesService.remove(id);
  }
}
