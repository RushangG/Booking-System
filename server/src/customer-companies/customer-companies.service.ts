import { Injectable } from '@nestjs/common';
import { CreateCustomerCompanyInput } from './dto/create-customer-company.input';
import { UpdateCustomerCompanyInput } from './dto/update-customer-company.input';

@Injectable()
export class CustomerCompaniesService {
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
