import { schemas } from '@/database/schemas';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins/admin';
import { jwt } from 'better-auth/plugins/jwt';
import { organization } from 'better-auth/plugins/organization';
import { db } from '../database/init';

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: false,
    schema: {
      user: schemas.user,
      account: schemas.account,
      session: schemas.session,
      verification: schemas.verification,
    },
  }),
  plugins: [organization(), admin(), jwt()],
  emailAndPassword: { enabled: true },
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  basePath: '/auth',
  secret: process.env.BETTER_AUTH_SECRET,
});

export default auth;
