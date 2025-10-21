import { user as userTable } from '@/app/api/modules/user/schema/user.schema';
import { builder } from '@/configs/graphql/builder';
import { db } from '@/database/init';
import { eq } from 'drizzle-orm';

// Define a User type using Drizzle plugin
const User = builder.drizzleObject('user', {
  name: 'User',
  description: 'A user of the system',
  fields: (t) => ({
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    emailVerified: t.exposeBoolean('emailVerified'),
    image: t.exposeString('image', { nullable: true }),
    createdAt: t.string({
      resolve: (user) => user.createdAt?.toISOString() ?? '',
    }),
    fullName: t.string({
      resolve: (user, args, ctx, info) => `${user.name}`,
    }),
  }),
});

// Define Account type
builder.drizzleObject('account', {
  name: 'Account',
  fields: (t) => ({
    id: t.exposeString('id'),
    providerId: t.exposeString('providerId'),
    accountId: t.exposeString('accountId'),
    createdAt: t.string({
      resolve: (account) => account.createdAt?.toISOString() ?? '',
    }),
  }),
});

// Define Session type
builder.drizzleObject('session', {
  name: 'Session',
  fields: (t) => ({
    id: t.exposeString('id'),
    token: t.exposeString('token'),
    expiresAt: t.string({
      resolve: (session) => session.expiresAt?.toISOString() ?? '',
    }),
    ipAddress: t.exposeString('ipAddress', { nullable: true }),
    userAgent: t.exposeString('userAgent', { nullable: true }),
  }),
});

builder.queryType({
  description: 'The query type for the user module',
  fields: (t) => ({
    me: t.field({
      type: User,
      nullable: true,
      resolve: async (root, args, ctx) => {
        const session = ctx.session;
        if (!session?.user?.id) return null;

        const [foundUser] = await ctx.db
          .select()
          .from(userTable)
          .where(eq(userTable.id, session.user.id))
          .limit(1);

        return foundUser ?? null;
      },
    }),
    users: t.field({
      type: [User],
      resolve: async (root, args, ctx) => {
        return db.select().from(userTable);
      },
    }),
    user: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: async (root, args, ctx) => {
        const [foundUser] = await ctx.db
          .select()
          .from(userTable)
          .where(eq(userTable.id, args.id))
          .limit(1);

        return foundUser ?? null;
      },
    }),
  }),
});
