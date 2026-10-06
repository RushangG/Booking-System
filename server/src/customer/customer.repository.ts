import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {
    super(customerRepo.target, customerRepo.manager);
  }
}
