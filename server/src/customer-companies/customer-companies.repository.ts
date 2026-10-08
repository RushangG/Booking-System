import { Repository } from 'typeorm';
import { CustomerCompany } from './entities/customer-company.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerCompaniesRepository extends Repository<CustomerCompany> {
  constructor(
    @InjectRepository(CustomerCompany)
    private readonly customerCompaniesRepository: Repository<CustomerCompany>,
  ) {
    super(
      customerCompaniesRepository.target,
      customerCompaniesRepository.manager,
    );
  }
}
