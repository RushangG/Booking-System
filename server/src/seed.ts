import { AppDataSource } from './data-source';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { UsersHasRoles } from './users_has_roles/entities/users_has_roles.entity';
import { RolesHasPermissions } from './roles_has_permissions/entities/roles_has_permissions.entity';
import { Company } from './companies/entities/company.entity';
import { CompaniesHasUsers } from './companies-has-users/entities/companies-has-users.entity';
import { Customer } from './customer/entities/customer.entity';
import { CustomerCompany } from './customer-companies/entities/customer-company.entity';
import { Location } from './locations/entities/location.entity';
import { AccommodationType } from './accommodation-types/entities/accommodation-type.entity';
import { Accommodation } from './accommodations/entities/accommodation.entity';
import { BookingStatus } from './booking-status/entities/booking-status.entity';
import { Booking } from './bookings/entities/booking.entity';

async function seed() {
  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.query(`
      TRUNCATE TABLE
        "auth_session",
        "booking",
        "accommodation",
        "customer_company",
        "customer",
        "companies_has_users",
        "company",
        "accommodation_type",
        "location",
        "booking_status",
        "roles_has_permissions",
        "users_has_roles",
        "permission",
        "role",
        "user"
      RESTART IDENTITY CASCADE;
    `);

    const userRepo = AppDataSource.getRepository(User);
    const roleRepo = AppDataSource.getRepository(Role);
    const permissionRepo = AppDataSource.getRepository(Permission);
    const userRoleRepo = AppDataSource.getRepository(UsersHasRoles);
    const rolePermissionRepo = AppDataSource.getRepository(RolesHasPermissions);
    const companyRepo = AppDataSource.getRepository(Company);
    const companyUserRepo = AppDataSource.getRepository(CompaniesHasUsers);
    const customerRepo = AppDataSource.getRepository(Customer);
    const customerCompanyRepo = AppDataSource.getRepository(CustomerCompany);
    const locationRepo = AppDataSource.getRepository(Location);
    const typeRepo = AppDataSource.getRepository(AccommodationType);
    const accommodationRepo = AppDataSource.getRepository(Accommodation);
    const statusRepo = AppDataSource.getRepository(BookingStatus);
    const bookingRepo = AppDataSource.getRepository(Booking);

    const password = await bcrypt.hash('admin123', 10);

    const [superAdminUser, adminUser, managerUser, normalUser] =
      await userRepo.save([
        userRepo.create({
          name: 'Super Admin',
          email: 'superadmin@gmail.com',
          password,
        }),

        userRepo.create({
          name: 'Rushang',
          email: 'admin@gmail.com',
          password,
        }),
        userRepo.create({
          name: 'Smit Patel',
          email: 'manager@gmail.com',
          password,
        }),
        userRepo.create({
          name: 'Harsh Patel',
          email: 'user@gmail.com',
          password,
        }),
      ]);

    const [superAdminRole, adminRole, managerRole, userRole] =
      await roleRepo.save([
        roleRepo.create({
          name: 'Super Admin',
          description: 'Full system access',
        }),

        roleRepo.create({
          name: 'Admin',
          description: 'Full system access',
        }),
        roleRepo.create({
          name: 'Manager',
          description: 'Manage company operations',
        }),
        roleRepo.create({
          name: 'User',
          description: 'Manage customers and bookings',
        }),
      ]);

    const permissionNames = [
      'users:view',
      'users:create',
      'users:update',
      'users:delete',
      'admin:assign-role',
      'admin:role-assign-permission',

      // Company
      'company:view',
      'company:create',
      'company:update',
      'company:delete',
      'company:assign-users',
      'company:assign-customers',
      'company:add-customer',

      // Customer
      'customer:view',
      'customer:create',
      'customer:update',
      'customer:delete',

      // Location
      'location:view',
      'location:create',
      'location:update',
      'location:delete',

      // Accommodation
      'accommodation:view',
      'accommodation:create',
      'accommodation:update',
      'accommodation:delete',

      // Booking
      'booking:view',
      'booking:create',
      'booking:update',
      'booking:delete',

      // Roles
      'role:view',
      'role:create',
      'role:update',
      'role:delete',
    ];

    const permissions = await permissionRepo.save(
      permissionNames.map((permission_type) =>
        permissionRepo.create({ permission_type }),
      ),
    );

    const permissionMap = new Map(
      permissions.map((permission) => [permission.permission_type, permission]),
    );

    const managerPermissionNames = [
      'company:view',
      'customer:view',
      'customer:create',
      'customer:update',
      'customer:delete',
      'location:view',
      'location:create',
      'location:update',
      'location:delete',
      'accommodation:view',
      'accommodation:create',
      'accommodation:update',
      'accommodation:delete',
      'booking:view',
      'booking:create',
      'booking:update',
      'booking:delete',
      'role:view',
    ];

    const userPermissionNames = [
      'customer:view',
      'customer:create',
      'customer:update',
      'customer:delete',
      'accommodation:view',
      'booking:view',
      'booking:create',
      'booking:update',
      'booking:delete',
    ];

    await rolePermissionRepo.save([
      // super admin: all permissions
      ...permissions.map((Permission) =>
        rolePermissionRepo.create({
          Role: superAdminRole,
          Permission,
        }),
      ),

      // Admin: all permissions
      ...permissions.map((Permission) =>
        rolePermissionRepo.create({
          Role: adminRole,
          Permission,
        }),
      ),

      // Manager: only the requested permissions
      ...managerPermissionNames.map((name) =>
        rolePermissionRepo.create({
          Role: managerRole,
          Permission: permissionMap.get(name)!,
        }),
      ),

      // User: only the requested permissions
      ...userPermissionNames.map((name) =>
        rolePermissionRepo.create({
          Role: userRole,
          Permission: permissionMap.get(name)!,
        }),
      ),
    ]);

    await userRoleRepo.save([
      userRoleRepo.create({
        User: superAdminUser,
        Role: superAdminRole,
      }),

      userRoleRepo.create({
        User: adminUser,
        Role: adminRole,
      }),
      userRoleRepo.create({
        User: managerUser,
        Role: managerRole,
      }),
      userRoleRepo.create({
        User: normalUser,
        Role: userRole,
      }),
    ]);

    const [superAdminCompany, adminCompany, managerCompany, userCompany] =
      await companyRepo.save([
        companyRepo.create({
          name: 'Super Admin Company',
          address: 'Nariman Point, Mumbai, Maharashtra',
          industry: 'Hospitality Management',
        }),

        companyRepo.create({
          name: 'Admin Super Company',
          address: 'Nariman Point, Mumbai, Maharashtra',
          industry: 'Hospitality Management',
        }),
        companyRepo.create({
          name: 'Shree Gujarat Workforce Services',
          address: 'Prahlad Nagar, Ahmedabad, Gujarat',
          industry: 'Workforce Accommodation',
        }),
        companyRepo.create({
          name: 'Narmada Industrial Services',
          address: 'Alkapuri, Vadodara, Gujarat',
          industry: 'Industrial Workforce Services',
        }),
      ]);

    await companyUserRepo.save([
      companyUserRepo.create({
        user: superAdminUser,
        company: superAdminCompany,
      }),

      companyUserRepo.create({
        user: adminUser,
        company: adminCompany,
      }),
      companyUserRepo.create({
        user: managerUser,
        company: managerCompany,
      }),
      companyUserRepo.create({
        user: normalUser,
        company: userCompany,
      }),
    ]);

    const [
      adminCustomer1,
      adminCustomer2,
      managerCustomer1,
      managerCustomer2,
      userCustomer1,
      userCustomer2,
    ] = await customerRepo.save([
      customerRepo.create({
        name: 'Kavita Sharma',
        email: 'kavita.sharma@example.com',
        phone: '9876543210',
      }),
      customerRepo.create({
        name: 'Vikram Joshi',
        email: 'vikram.joshi@example.com',
        phone: '9876543211',
      }),
      customerRepo.create({
        name: 'Mehul Trivedi',
        email: 'mehul.trivedi@example.com',
        phone: '9876543212',
      }),
      customerRepo.create({
        name: 'Nisha Patel',
        email: 'nisha.patel@example.com',
        phone: '9876543213',
      }),
      customerRepo.create({
        name: 'Dhruv Mehta',
        email: 'dhruv.mehta@example.com',
        phone: '9876543214',
      }),
      customerRepo.create({
        name: 'Anjali Desai',
        email: 'anjali.desai@example.com',
        phone: '9876543215',
      }),
    ]);

    await customerCompanyRepo.save([
      customerCompanyRepo.create({
        Customer: adminCustomer1,
        Company: adminCompany,
      }),
      customerCompanyRepo.create({
        Customer: adminCustomer2,
        Company: adminCompany,
      }),
      customerCompanyRepo.create({
        Customer: managerCustomer1,
        Company: managerCompany,
      }),
      customerCompanyRepo.create({
        Customer: managerCustomer2,
        Company: managerCompany,
      }),
      customerCompanyRepo.create({
        Customer: userCustomer1,
        Company: userCompany,
      }),
      customerCompanyRepo.create({
        Customer: userCustomer2,
        Company: userCompany,
      }),
    ]);

    const [mumbai, ahmedabad, vadodara] = await locationRepo.save([
      locationRepo.create({
        name: 'Mumbai Business District',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        address: 'Nariman Point, Mumbai',
      }),
      locationRepo.create({
        name: 'Ahmedabad Industrial Hub',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        address: 'Sanand Industrial Area, Ahmedabad',
      }),
      locationRepo.create({
        name: 'Vadodara Industrial Hub',
        city: 'Vadodara',
        state: 'Gujarat',
        country: 'India',
        address: 'Makarpura GIDC, Vadodara',
      }),
    ]);

    const [hotelType, apartmentType, hostelType] = await typeRepo.save([
      typeRepo.create({
        name: 'Hotel',
        description: 'Hotel rooms for business travellers',
      }),
      typeRepo.create({
        name: 'Apartment',
        description: 'Furnished apartments for longer stays',
      }),
      typeRepo.create({
        name: 'Hostel',
        description: 'Affordable shared accommodation',
      }),
    ]);

    // --------------------------------------------------
    // 8. ACCOMMODATIONS
    // Two accommodations associated with each location.
    // --------------------------------------------------

    const [
      adminAccommodation1,
      adminAccommodation2,
      managerAccommodation1,
      managerAccommodation2,
      userAccommodation1,
      userAccommodation2,
    ] = await accommodationRepo.save([
      accommodationRepo.create({
        name: 'Marine View Business Hotel',
        description: 'Business hotel near South Mumbai offices',
        price_per_night: 4500,
        location_id: mumbai,
        type_id: hotelType,
      }),
      accommodationRepo.create({
        name: 'Nariman Point Executive Apartment',
        description: 'Furnished apartment for corporate guests',
        price_per_night: 3200,
        location_id: mumbai,
        type_id: apartmentType,
      }),
      accommodationRepo.create({
        name: 'Sanand Comfort Residency',
        description: 'Comfortable rooms near the industrial zone',
        price_per_night: 2200,
        location_id: ahmedabad,
        type_id: hotelType,
      }),
      accommodationRepo.create({
        name: 'Ahmedabad Staff Apartments',
        description: 'Furnished apartments for working professionals',
        price_per_night: 1800,
        location_id: ahmedabad,
        type_id: apartmentType,
      }),
      accommodationRepo.create({
        name: 'Makarpura Worker Hostel',
        description: 'Budget accommodation near Makarpura GIDC',
        price_per_night: 700,
        location_id: vadodara,
        type_id: hostelType,
      }),
      accommodationRepo.create({
        name: 'Vadodara Business Residency',
        description: 'Private rooms for industrial visitors',
        price_per_night: 1900,
        location_id: vadodara,
        type_id: hotelType,
      }),
    ]);

    // --------------------------------------------------
    // 9. BOOKING STATUSES
    // --------------------------------------------------

    const [pending, confirmed, cancelled] = await statusRepo.save([
      statusRepo.create({ name: 'Pending' }),
      statusRepo.create({ name: 'Confirmed' }),
      statusRepo.create({ name: 'Cancelled' }),
    ]);

    await bookingRepo.save([
      bookingRepo.create({
        customer: adminCustomer1,
        accommodation: adminAccommodation1,
        status: confirmed,
        check_in: new Date('2026-11-10T00:00:00'),
        check_out: new Date('2026-11-13T00:00:00'),
        created_by: adminUser.id,
      }),
      bookingRepo.create({
        customer: adminCustomer2,
        accommodation: adminAccommodation2,
        status: pending,
        check_in: new Date('2026-11-15T00:00:00'),
        check_out: new Date('2026-11-18T00:00:00'),
        created_by: adminUser.id,
      }),
      bookingRepo.create({
        customer: managerCustomer1,
        accommodation: managerAccommodation1,
        status: confirmed,
        check_in: new Date('2026-11-12T00:00:00'),
        check_out: new Date('2026-11-16T00:00:00'),
        created_by: managerUser.id,
      }),
      bookingRepo.create({
        customer: managerCustomer2,
        accommodation: managerAccommodation2,
        status: pending,
        check_in: new Date('2026-11-20T00:00:00'),
        check_out: new Date('2026-11-23T00:00:00'),
        created_by: managerUser.id,
      }),
      bookingRepo.create({
        customer: userCustomer1,
        accommodation: userAccommodation1,
        status: confirmed,
        check_in: new Date('2026-11-14T00:00:00'),
        check_out: new Date('2026-11-17T00:00:00'),
        created_by: normalUser.id,
      }),
      bookingRepo.create({
        customer: userCustomer2,
        accommodation: userAccommodation2,
        status: cancelled,
        check_in: new Date('2026-11-22T00:00:00'),
        check_out: new Date('2026-11-25T00:00:00'),
        created_by: normalUser.id,
      }),
    ]);

    console.log('Seed completed successfully.');
    console.log('Login credentials for all accounts: admin123');
    console.log('Super Admin: superadmin@gmail.com');
    console.log('Admin:   admin@gmail.com');
    console.log('Manager: manager@gmail.com');
    console.log('User:    user@gmail.com');
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
