import { user } from '@/app/api/modules/user/schema/user.schema';
import { defineRelations } from 'drizzle-orm';
import { account } from './account.schema';
import { session } from './session.schema';

export const authRelations = defineRelations(
  { account, session, user },
  (r) => ({
    account: {
      user: r.one.user({
        from: r.account.userId,
        to: r.user.id,
      }),
    },
    session: {
      user: r.one.user({
        from: r.session.userId,
        to: r.user.id,
      }),
    },
  })
);
