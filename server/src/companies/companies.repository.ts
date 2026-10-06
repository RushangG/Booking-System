import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesRepository extends Repository<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {
    super(companyRepo.target, companyRepo.manager);
  }
}
