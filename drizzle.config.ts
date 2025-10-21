import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './server/database/migrations',
  schema: './server/app/**/*.schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
