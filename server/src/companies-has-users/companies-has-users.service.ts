import { Injectable } from '@nestjs/common';
import { CreateCompaniesHasUserInput } from './dto/create-companies-has-user.input';
import { UpdateCompaniesHasUserInput } from './dto/update-companies-has-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesHasUsers } from './entities/companies-has-users.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
@Injectable()
export class CompaniesHasUsersService {
  constructor(
    @InjectRepository(CompaniesHasUsers)
    private readonly companiesHasUsersRepo: Repository<CompaniesHasUsers>,
  ) {}

 

  async assignUsersToCompany(userIds: number[], companyId: number) {
   
    await this.companiesHasUsersRepo.delete({ company: { id: companyId } });

    let newUserCompanies: CompaniesHasUsers[] = userIds.map((userId) => {
      let newUserCompany = new CompaniesHasUsers();
      newUserCompany.user = { id: userId } as User;
      newUserCompany.company = { id: companyId } as Company;
      return newUserCompany;
    });

    let savedUserCompanies =
      await this.companiesHasUsersRepo.save(newUserCompanies);

    return await this.companiesHasUsersRepo.find({
      where: { company: { id: companyId } },
      relations: {
        user: true,
        company: true,
      },
    });
  }

  create(createCompaniesHasUserInput: CreateCompaniesHasUserInput) {
    return 'This action adds a new companiesHasUser';
  }

  findAll() {
    return `This action returns all companiesHasUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companiesHasUser`;
  }

  update(id: number, updateCompaniesHasUserInput: UpdateCompaniesHasUserInput) {
    return `This action updates a #${id} companiesHasUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} companiesHasUser`;
  }
}
