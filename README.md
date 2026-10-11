## Project Setup

### Backend

1. Create PostgreSQL database: `bookingSystemDB`
2. Create `.env` file with required variables.
{
ACCESS_SECRET = jwt-secret
REFRESH_SECRET = jwt-refresh-secret
PORT = 4000
}

3. Install packages:

npm install

migrate:generate -n InitialMigration

npm run migration:generate -- src/migrations/001-InitialMigration (for generating migration file)

npm run migration:create -- src/migrations/001-InitialMigration (for creating migration file)

npm run migration:run (for running migration)

npm run migration:revert (for reverting migration)

4. Create tables and seed data:

 npx ts-node --transpile-only src/seed.ts


5. Start backend:

npm run start:dev


### Frontend

1. Install packages:

npm install

2. Start frontend:

npm run dev



