import { DataSource } from 'typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Company } from './companies/entities/company.entity';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'bookingSystemDB',
  synchronize: true,
  logging: false,
  entities: [Customer, Company, User, Role, Permission],
});
