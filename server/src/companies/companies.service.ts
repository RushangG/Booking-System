import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesRepository)
    private readonly companyRepo: CompaniesRepository,
  ) {}

  create(createCompanyInput: CreateCompanyInput) {
    let company = this.companyRepo.create(createCompanyInput);
    return this.companyRepo.save(company);
  }

  async findAll() {
    let companies = await this.companyRepo.find({
      relations: {
        customerCompanies: {
          Customer: true,
        },
      },
    });

    return companies;
  }

  async findOne(id: number) {
    let company = await this.companyRepo.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }
  async update(id: number, updateCompanyInput: UpdateCompanyInput) {
    let company = await this.companyRepo.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    await this.companyRepo.update(id, updateCompanyInput);
    return await this.companyRepo.findOneBy({ id });
  }

  async remove(id: number) {
    let company = await this.companyRepo.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    this.companyRepo.delete(id);
    return `Company with ID ${id} has been deleted`;
  }
}
