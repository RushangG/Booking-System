import { Injectable } from '@nestjs/common';
import { CreateCustomerCompanyInput } from './dto/create-customer-company.input';
import { UpdateCustomerCompanyInput } from './dto/update-customer-company.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerCompany } from './entities/customer-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerCompaniesService {
  constructor(
    @InjectRepository(CustomerCompany)
    private readonly customerCompaniesRepo: Repository<CustomerCompany>,
  ) {}

  async assignCustomersToCompany(
    companyIds: number[],
    customerId: number,
  ) {
    // Delete existing customer 
    await this.customerCompaniesRepo.delete({ Customer: { id: customerId } });

    // Create new customer-company 
    const newCustomerCompanies = companyIds.map((companyId) => {
      const newCustomerCompany = this.customerCompaniesRepo.create({
        Customer: { id: customerId },
        Company: { id: companyId },
      });
      return newCustomerCompany;
    });

    await this.customerCompaniesRepo.save(newCustomerCompanies);

    let customerCompanies = await this.customerCompaniesRepo.find({
      where: { Customer: { id: customerId } },
      relations: {
        Customer: true,
        Company: true,
      },
    });

    return customerCompanies;
  }

  create(createCustomerCompanyInput: CreateCustomerCompanyInput) {
    return 'This action adds a new customerCompany';
  }

  findAll() {
    return `This action returns all customerCompanies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerCompany`;
  }

  update(id: number, updateCustomerCompanyInput: UpdateCustomerCompanyInput) {
    return `This action updates a #${id} customerCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerCompany`;
  }
}
