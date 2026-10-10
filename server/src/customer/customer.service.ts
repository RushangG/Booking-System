import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerCompaniesService } from '../customer-companies/customer-companies.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private readonly customerRepo: CustomerRepository,
    private readonly customerCompanyRepo: CustomerCompaniesService,
  ) {}

  async create(createCustomerInput: CreateCustomerInput, companyId?: number) {
    const customer = this.customerRepo.create(createCustomerInput);

    let saveCustomer = await this.customerRepo.save(customer);

    if (companyId) {
      try {
        await this.customerCompanyRepo.createCustomerCompany(
          saveCustomer.id,
          companyId,
        );
      } catch (error) {
        console.error('Error creating customer-company relationship:', error);
        throw new Error('Failed to create customer-company relationship');
      }
    }

    return saveCustomer;
  }

  async findAll(search?: string) {
    let query = this.customerRepo.createQueryBuilder('customer');

    if (search) {
      query.andWhere(
        '(customer.name ILIKE :search OR customer.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    let customers = await query.getMany();
    return customers;

    // return await this.customerRepo.find({
    //   relations: {
    //     company: true,
    //   },
    // });
  }

  async findOne(id: number) {
    let customer = await this.customerRepo.findOne({
      where: { id },
      relations: {
        customerCompanies: {
          Company: true,
        },
      },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findCustomersNotInCompany(companyId: number) {
      const usersInCompany = await this.customerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.customerCompanies', 'customerCompany')
      .where('customerCompany.companyId = :companyId', { companyId })
      .getMany();

    const usersInCompanyIds = usersInCompany.map((customer) => customer.id);

    const customersNotInCompany = await this.customerRepo
      .createQueryBuilder('customer')
      .where('customer.id NOT IN (:...ids)', { ids: usersInCompanyIds.length > 0 ? usersInCompanyIds : [0] })
      .getMany();

    return customersNotInCompany;
            
    }
 

  async update(id: number, updateCustomerInput: UpdateCustomerInput) {
    let customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepo.update(id, updateCustomerInput);
    return await this.customerRepo.findOneBy({ id });
  }

  async remove(id: number) {
    let customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepo.delete(id);
    return `Customer with ID ${id} has been deleted successfully`;
  }
}
