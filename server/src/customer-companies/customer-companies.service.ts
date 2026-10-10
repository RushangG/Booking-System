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

  async assignCustomersToCompany(companyId: number, customerIds: number[]) {
    // Delete existing customer
    await this.customerCompaniesRepo.delete({ Company: { id: companyId } });

    // Create new customer-company associations
    const newCustomerCompanies = customerIds.map((customerId) => {
      const newCustomerCompany = this.customerCompaniesRepo.create({
        Customer: { id: customerId }, 
        Company: { id: companyId },
      });
      return newCustomerCompany;
    }
    );
    // Save the new associations
    await this.customerCompaniesRepo.save(newCustomerCompanies);

    let customerCompanies = await this.customerCompaniesRepo.find({
      where: { Company: { id: companyId } },
      relations: {
        Customer: true,
        Company: true,
      },
    });

    return customerCompanies;
  }

  async removeCustomerFromCompany(companyId: number, customerId: number) {
    try {
      await this.customerCompaniesRepo.delete({
        Company: { id: companyId },
        Customer: { id: customerId },
      });

      return `Customer with ID ${customerId} removed from company with ID ${companyId}`;
    } catch (error) {
      console.error('Error removing customer from company:', error);
      throw new Error('Failed to remove customer from company');
    }
  }

 async createCustomerCompany(customerId: number, companyId: number) {
    const newCustomerCompany = this.customerCompaniesRepo.create({
      Customer: { id: customerId },
      Company: { id: companyId },
    });
    return await this.customerCompaniesRepo.save(newCustomerCompany);
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
