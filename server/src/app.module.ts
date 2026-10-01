import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { CustomerModule } from './customer/customer.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...AppDataSource.options }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),

    CompaniesModule,
    CustomerModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
