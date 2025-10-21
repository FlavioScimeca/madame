import { schemas } from '@/database/schemas';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../database/init';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
    schema: schemas,
  }),
  emailAndPassword: { enabled: true },
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  basePath: '/auth',
  secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;
