import { Module } from '@nestjs/common';
import { CompaniesHasUsersService } from './companies-has-users.service';
import { CompaniesHasUsersResolver } from './companies-has-users.resolver';
import { CompaniesHasUsers } from './entities/companies-has-users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesHasUsersRepository } from './companies-has-users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesHasUsers])],
  providers: [CompaniesHasUsersResolver, CompaniesHasUsersService, CompaniesHasUsersRepository],
}) 
export class CompaniesHasUsersModule {}
