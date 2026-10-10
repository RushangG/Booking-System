import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791638336229 implements MigrationInterface {
    name = 'InitialSchema1791638336229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "address" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "booking_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3b521fe4729cfad477690ca29d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "permission" ("id" SERIAL NOT NULL, "permission_type" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "roles_has_permissions" ("id" SERIAL NOT NULL, "roleId" integer, "permissionId" integer, CONSTRAINT "UQ_762b9570a3211a3d8a6352154ba" UNIQUE ("roleId", "permissionId"), CONSTRAINT "PK_4ad0cc72964be0001c887473a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users_has_roles" ("id" SERIAL NOT NULL, "userId" integer, "roleId" integer, CONSTRAINT "UQ_65cf8e50f9033649ac05de5371c" UNIQUE ("userId", "roleId"), CONSTRAINT "PK_dfc09be88f94ce236416834c143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "auth_session" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "accessTokenExpires" TIMESTAMP NOT NULL, "refreshToken" character varying NOT NULL, "refreshTokenExpires" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_19354ed146424a728c1112a8cbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "companies_has_users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "companyId" integer, CONSTRAINT "UQ_d1697266103639aebc7c06d8791" UNIQUE ("userId", "companyId"), CONSTRAINT "PK_c9f480bdc0bb533ae45c61c38c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "industry" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "customer_company" ("id" SERIAL NOT NULL, "customerId" integer, "companyId" integer, CONSTRAINT "UQ_e1c94d16c0a3b019cb139d41280" UNIQUE ("customerId", "companyId"), CONSTRAINT "PK_170a73f2523d7ca266834e38ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "booking" ("id" SERIAL NOT NULL, "created_by" integer NOT NULL, "check_in" TIMESTAMP NOT NULL, "check_out" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" integer, "accommodationId" integer, "statusId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "accommodation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price_per_night" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "type_id" integer, "location_id" integer, CONSTRAINT "PK_2c4c7f0aaccd4ff2238559a617c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "accommodation_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8702ef822ee2ff100de8f67449" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_bf3eee83be473689e92a594e5d9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_9b800c1c20611d2b7fb638a59e2" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_has_roles" ADD CONSTRAINT "FK_a87a80895cecc55968219334a4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_has_roles" ADD CONSTRAINT "FK_01173e439a732259360bd083b9d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth_session" ADD CONSTRAINT "FK_c072b729d71697f959bde66ade0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_has_users" ADD CONSTRAINT "FK_beb372e4c07dd9d6ee85dfa383a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies_has_users" ADD CONSTRAINT "FK_a656fdcd04b03a7aeaa636eda15" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_company" ADD CONSTRAINT "FK_6e6103b00afab04466d61b82f3d" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer_company" ADD CONSTRAINT "FK_97a5c8b3df04a019f910bdb1e8f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_72e32d29a7de28b3c469f858d56" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_030809e61a2384cb025770fbb9e" FOREIGN KEY ("accommodationId") REFERENCES "accommodation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_2805c8cb30d54f8272c830cb488" FOREIGN KEY ("statusId") REFERENCES "booking_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accommodation" ADD CONSTRAINT "FK_d8702ef822ee2ff100de8f67449" FOREIGN KEY ("type_id") REFERENCES "accommodation_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accommodation" ADD CONSTRAINT "FK_900ae8f0196ca3d84b4f3ecf0b7" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accommodation" DROP CONSTRAINT "FK_900ae8f0196ca3d84b4f3ecf0b7"`);
        await queryRunner.query(`ALTER TABLE "accommodation" DROP CONSTRAINT "FK_d8702ef822ee2ff100de8f67449"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_2805c8cb30d54f8272c830cb488"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_030809e61a2384cb025770fbb9e"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_72e32d29a7de28b3c469f858d56"`);
        await queryRunner.query(`ALTER TABLE "customer_company" DROP CONSTRAINT "FK_97a5c8b3df04a019f910bdb1e8f"`);
        await queryRunner.query(`ALTER TABLE "customer_company" DROP CONSTRAINT "FK_6e6103b00afab04466d61b82f3d"`);
        await queryRunner.query(`ALTER TABLE "companies_has_users" DROP CONSTRAINT "FK_a656fdcd04b03a7aeaa636eda15"`);
        await queryRunner.query(`ALTER TABLE "companies_has_users" DROP CONSTRAINT "FK_beb372e4c07dd9d6ee85dfa383a"`);
        await queryRunner.query(`ALTER TABLE "auth_session" DROP CONSTRAINT "FK_c072b729d71697f959bde66ade0"`);
        await queryRunner.query(`ALTER TABLE "users_has_roles" DROP CONSTRAINT "FK_01173e439a732259360bd083b9d"`);
        await queryRunner.query(`ALTER TABLE "users_has_roles" DROP CONSTRAINT "FK_a87a80895cecc55968219334a4a"`);
        await queryRunner.query(`ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_9b800c1c20611d2b7fb638a59e2"`);
        await queryRunner.query(`ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_bf3eee83be473689e92a594e5d9"`);
        await queryRunner.query(`DROP TABLE "accommodation_type"`);
        await queryRunner.query(`DROP TABLE "accommodation"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "customer_company"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "companies_has_users"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "auth_session"`);
        await queryRunner.query(`DROP TABLE "users_has_roles"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "roles_has_permissions"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "booking_status"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
