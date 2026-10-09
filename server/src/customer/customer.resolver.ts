import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
    @Args('companyId', { type: () => Int, nullable: true }) companyId?: number,
  ) {
    return this.customerService.create(createCustomerInput, companyId);
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
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customerService.update(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  @Mutation(() => String)
  removeCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.customerService.remove(id);
  }
}
