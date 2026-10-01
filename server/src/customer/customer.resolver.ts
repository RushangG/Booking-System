import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

// import { Public } from 'src/auth/public.decorator';
import { Company } from '../companies/entities/company.entity';
import { CompaniesService } from '../companies/companies.service';

// @Public()
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customerService.create(createCustomerInput);
  }

  @Query(() => [Customer], { name: 'customerAll' })
  async findAll(@Args('search', { nullable: true }) search?: string) {
    let customers = await this.customerService.findAll(search);
    return customers;
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customerService.findOne(id);
  }

  @Mutation(() => Customer)
  updateCustomer(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customerService.update(id, updateCustomerInput);
  }

  @Mutation(() => String)
  removeCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.customerService.remove(id);
  }

  @ResolveField(() => Company)
  async company(@Parent() customer: Customer) {
    const { company } = customer;
    if (typeof company === 'number') {
      let companyObject = await this.companiesService.findOne(company);
      return companyObject;
    }

    return company;
  }
}
