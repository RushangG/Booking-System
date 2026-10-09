import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CompaniesModule } from '../companies/companies.module';
import { CustomerRepository } from './customer.repository';
import { CustomerCompaniesModule } from '../customer-companies/customer-companies.module';
@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CompaniesModule, CustomerCompaniesModule],
  providers: [CustomerResolver, CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
