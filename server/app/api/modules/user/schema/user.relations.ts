import { account } from '@/app/api/auth/schema/account.schema';
import { session } from '@/app/api/auth/schema/session.schema';
import { defineRelations } from 'drizzle-orm';
import { user } from './user.schema';

export const userRelations = defineRelations(
  { user, account, session },
  (r) => ({
    user: {
      accounts: r.many.account({
        from: r.user.id,
        to: r.account.userId,
      }),
      sessions: r.many.session({
        from: r.user.id,
        to: r.session.userId,
      }),
    },
  })
);
