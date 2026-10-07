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

4. Create tables and seed data:

 npx ts-node --transpile-only src/seed.ts


5. Start backend:

npm run start:dev


### Frontend

1. Install packages:

npm install

2. Start frontend:

npm run dev



