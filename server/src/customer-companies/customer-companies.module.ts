import { Module } from '@nestjs/common';
import { CustomerCompaniesService } from './customer-companies.service';
import { CustomerCompaniesResolver } from './customer-companies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCompany } from './entities/customer-company.entity';
import { CustomerCompaniesRepository } from './customer-companies.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerCompany])],
  providers: [CustomerCompaniesResolver, CustomerCompaniesService, CustomerCompaniesRepository],
})
export class CustomerCompaniesModule {}
