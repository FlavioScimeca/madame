import { SQL } from 'bun';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
import { relations } from './relations';

const client = new SQL(process.env.DATABASE_URL!);
export const db = drizzle({ client, relations });
