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
import { AuthModule } from './auth/auth.module';
import { AccommodationTypesModule } from './accommodation-types/accommodation-types.module';
import { LocationsModule } from './locations/locations.module';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { BookingStatusModule } from './booking-status/booking-status.module';
import { BookingsModule } from './bookings/bookings.module';
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
    AuthModule,
    AccommodationTypesModule,
    LocationsModule,
    AccommodationsModule,
    BookingStatusModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
