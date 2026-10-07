import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';

import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { UsersHasRoles } from './users_has_roles/entities/users_has_roles.entity';
import { RolesHasPermissions } from './roles_has_permissions/entities/roles_has_permissions.entity';
import { Company } from './companies/entities/company.entity';

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
      "user"
    RESTART IDENTITY CASCADE;
  `);

  const userRepo = AppDataSource.getRepository(User);
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);
  const userRoleRepo = AppDataSource.getRepository(UsersHasRoles);
  const rolePermissionRepo = AppDataSource.getRepository(RolesHasPermissions);
  const companyRepo = AppDataSource.getRepository(Company);

  const password = await bcrypt.hash('admin@123', 10);

  const users = await userRepo.save([
    userRepo.create({
      name: 'Admin',
      email: 'admin@gmail.com',
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
    permissionRepo.create({ permission_type: 'customers:view' }),
    permissionRepo.create({ permission_type: 'customers:manage' }),
    permissionRepo.create({ permission_type: 'companies:view' }),
    permissionRepo.create({ permission_type: 'companies:manage' }),
    permissionRepo.create({ permission_type: 'accommodations:view' }),
    permissionRepo.create({ permission_type: 'accommodations:manage' }),
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

  await companyRepo.save(
    companyRepo.create({
      name: 'Demo Company',
      address: 'Ahmedabad, Gujarat',
      industry: 'Hospitality',
    }),
  );

  await queryRunner.release();
  await AppDataSource.destroy();

  console.log('Seed completed');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});