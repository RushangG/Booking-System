import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompaniesHasUsers } from './entities/companies-has-users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesHasUsersRepository extends Repository<CompaniesHasUsers> {
  constructor(
    @InjectRepository(CompaniesHasUsers)
    private readonly companiesHasUsersRepository: Repository<CompaniesHasUsers>,
  ) {
    super(
      companiesHasUsersRepository.target,
      companiesHasUsersRepository.manager,
    );
  }
}
