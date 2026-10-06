import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CompaniesModule } from '../companies/companies.module';
import { CustomerRepository } from './customer.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Customer]), CompaniesModule],
  providers: [CustomerResolver, CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
