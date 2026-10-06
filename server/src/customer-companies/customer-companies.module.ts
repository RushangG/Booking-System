import { Module } from '@nestjs/common';
import { CustomerCompaniesService } from './customer-companies.service';
import { CustomerCompaniesResolver } from './customer-companies.resolver';

@Module({
  providers: [CustomerCompaniesResolver, CustomerCompaniesService],
})
export class CustomerCompaniesModule {}
