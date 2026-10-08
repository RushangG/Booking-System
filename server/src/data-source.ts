import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Company } from './companies/entities/company.entity';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { AccommodationType } from './accommodation-types/entities/accommodation-type.entity';
import { Location } from './locations/entities/location.entity';
import { Accommodation } from './accommodations/entities/accommodation.entity';
import { BookingStatus } from './booking-status/entities/booking-status.entity';
import { Booking } from './bookings/entities/booking.entity';
import { UsersHasRoles } from './users_has_roles/entities/users_has_roles.entity';
import { RolesHasPermissions } from './roles_has_permissions/entities/roles_has_permissions.entity';
import { CustomerCompany } from './customer-companies/entities/customer-company.entity';
import { AuthSession } from './auth/entities/auth-session.entity';
import { CompaniesHasUsers } from './companies-has-users/entities/companies-has-users.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'bookingSystemDB',
  synchronize: true,
  logging: false,
  entities: [
    Customer,
    Company,
    User,
    Role,
    Permission,
    AccommodationType,
    Location,
    Accommodation,
    BookingStatus,
    Booking,
    UsersHasRoles,
    RolesHasPermissions,
    CustomerCompany,
    AuthSession,
    CompaniesHasUsers,
  ],
});
