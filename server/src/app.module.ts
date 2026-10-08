import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './auth/guards/gql-auth.guard';

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
import { UsersHasRolesModule } from './users_has_roles/users_has_roles.module';
import { RolesHasPermissionsModule } from './roles_has_permissions/roles_has_permissions.module';
import { CustomerCompaniesModule } from './customer-companies/customer-companies.module';
import { CompaniesHasUsersModule } from './companies-has-users/companies-has-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...AppDataSource.options }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,

      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
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
    UsersHasRolesModule,
    RolesHasPermissionsModule,
    CustomerCompaniesModule,
    CompaniesHasUsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
