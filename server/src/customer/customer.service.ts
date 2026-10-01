import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  create(createCustomerInput: CreateCustomerInput) {
    const customer = this.customerRepo.create(createCustomerInput);
    return this.customerRepo.save(customer);
  }

  async findAll(search?: string) {
    let query = this.customerRepo.createQueryBuilder('customer');

    if (search) {
      query.andWhere(
        '(customer.name ILIKE :search OR customer.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }
    query.leftJoinAndSelect('customer.company', 'company');
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
        company: true,
      },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findByCompanyId(companyId: number) {
    let customers = await this.customerRepo.find({
      where: { company: { id: companyId } },
    });
    return customers;
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
