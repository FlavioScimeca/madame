import { user } from '@/app/api/modules/user/schema/user.schema';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { organization } from './organization.schema';

export const member = pgTable('member', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').default('member').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
