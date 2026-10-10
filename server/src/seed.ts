import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';

import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { UsersHasRoles } from './users_has_roles/entities/users_has_roles.entity';
import { RolesHasPermissions } from './roles_has_permissions/entities/roles_has_permissions.entity';
import { Company } from './companies/entities/company.entity';
import { BookingStatus } from './booking-status/entities/booking-status.entity';
import { AccommodationType } from './accommodation-types/entities/accommodation-type.entity';
import { Location } from './locations/entities/location.entity';
import { CompaniesHasUsers } from './companies-has-users/entities/companies-has-users.entity';

async function seed() {
  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.query(`
    TRUNCATE TABLE
      "auth_session",
      "booking",
      "accommodation",
      "customer_company",
      "customer",
      "company",
      "accommodation_type",
      "location",
      "booking_status",
      "roles_has_permissions",
      "users_has_roles",
      "permission",
      "role",
      "user",
      "companies_has_users"
    RESTART IDENTITY CASCADE;
  `);

  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);
  const userRoleRepo = AppDataSource.getRepository(UsersHasRoles);
  const rolePermissionRepo = AppDataSource.getRepository(RolesHasPermissions);
  const companyRepo = AppDataSource.getRepository(Company);
  const bookingStatusRepo = AppDataSource.getRepository(BookingStatus);
  const accommodationTypeRepo = AppDataSource.getRepository(AccommodationType);
  const locationRepo = AppDataSource.getRepository(Location);
  const companiesHasUsersRepo = AppDataSource.getRepository(CompaniesHasUsers);

  const password = await bcrypt.hash('admin123', 10);

  const users = await userRepo.save([
    userRepo.create({
      name: 'Admin',
      email: 'admin123@gmail.com',
      password,
    }),
    userRepo.create({
      name: 'Manager',
      email: 'manager@gmail.com',
      password,
    }),
    userRepo.create({
      name: 'User',
      email: 'user@gmail.com',
      password,
    }),
  ]);

  let adminCompany = await companyRepo.save(
    companyRepo.create({
      name: 'Admin Company',
      address: 'Ahmedabad, Gujarat',
      industry: 'Hospitality',
    }),
  );

  await companiesHasUsersRepo.save(
    companiesHasUsersRepo.create({
      user: users[0],
      company: adminCompany,
    }),
  );

  const roles = await roleRepo.save([
    roleRepo.create({
      name: 'Admin',
      description: 'Full system access',
    }),
    roleRepo.create({
      name: 'Manager',
      description: 'Manage business operations',
    }),
    roleRepo.create({
      name: 'User',
      description: 'View business data',
    }),
  ]);

  const permissions = await permissionRepo.save([
    permissionRepo.create({ permission_type: 'users:view' }),
    permissionRepo.create({ permission_type: 'users:create' }),
    permissionRepo.create({ permission_type: 'users:update' }),
    permissionRepo.create({ permission_type: 'users:delete' }),
    permissionRepo.create({ permission_type: 'admin:assign-role' }),
    permissionRepo.create({ permission_type: 'company:view' }),
    permissionRepo.create({ permission_type: 'company:create' }),
    permissionRepo.create({ permission_type: 'company:update' }),
    permissionRepo.create({ permission_type: 'company:delete' }),
    permissionRepo.create({ permission_type: 'company:assign-users' }),
    permissionRepo.create({ permission_type: 'company:assign-customers' }),
    permissionRepo.create({ permission_type: 'company:add-customer' }),
    permissionRepo.create({ permission_type: 'customer:view' }),
    permissionRepo.create({ permission_type: 'customer:create' }),
    permissionRepo.create({ permission_type: 'customer:update' }),
    permissionRepo.create({ permission_type: 'customer:delete' }),
    permissionRepo.create({ permission_type: 'location:view' }),
    permissionRepo.create({ permission_type: 'location:create' }),
    permissionRepo.create({ permission_type: 'location:update' }),
    permissionRepo.create({ permission_type: 'location:delete' }),
    permissionRepo.create({ permission_type: 'accommodation:view' }),
    permissionRepo.create({ permission_type: 'accommodation:create' }),
    permissionRepo.create({ permission_type: 'accommodation:update' }),
    permissionRepo.create({ permission_type: 'accommodation:delete' }),
    permissionRepo.create({ permission_type: 'booking:view' }),
    permissionRepo.create({ permission_type: 'booking:create' }),
    permissionRepo.create({ permission_type: 'booking:update' }),
    permissionRepo.create({ permission_type: 'booking:delete' }),
    permissionRepo.create({ permission_type: 'role:view' }),
    permissionRepo.create({ permission_type: 'admin:role-assign-permission' }),
  ]);

  await userRoleRepo.save([
    userRoleRepo.create({ User: users[0], Role: roles[0] }),
    userRoleRepo.create({ User: users[1], Role: roles[1] }),
    userRoleRepo.create({ User: users[2], Role: roles[2] }),
  ]);

  await rolePermissionRepo.save([
    ...permissions.map((Permission) =>
      rolePermissionRepo.create({
        Role: roles[0],
        Permission,
      }),
    ),
    ...permissions.map((Permission) =>
      rolePermissionRepo.create({
        Role: roles[1],
        Permission,
      }),
    ),
    rolePermissionRepo.create({
      Role: roles[2],
      Permission: permissions[0],
    }),
    rolePermissionRepo.create({
      Role: roles[2],
      Permission: permissions[2],
    }),
    rolePermissionRepo.create({
      Role: roles[2],
      Permission: permissions[4],
    }),
  ]);

  await bookingStatusRepo.save([
    bookingStatusRepo.create({ name: 'Pending' }),
    bookingStatusRepo.create({ name: 'Confirmed' }),
    bookingStatusRepo.create({ name: 'Cancelled' }),
  ]);

  await accommodationTypeRepo.save([
    accommodationTypeRepo.create({ name: 'Hotel', description: 'Hotel' }),
    accommodationTypeRepo.create({ name: 'Hostel', description: 'Hostel' }),
    accommodationTypeRepo.create({
      name: 'Apartment',
      description: 'Apartment',
    }),
  ]);

  await locationRepo.save([
    locationRepo.create({
      name: 'Location 1',
      city: 'City 1',
      state: 'State 1',
      country: 'Country 1',
      address: 'Address 1',
    }),
    locationRepo.create({
      name: 'Location 2',
      city: 'City 2',
      state: 'State 2',
      country: 'Country 2',
      address: 'Address 2',
    }),
  ]);

  await queryRunner.release();
  await AppDataSource.destroy();

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
