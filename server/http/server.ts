import { user } from '@/app/api/modules/user/schema/user.schema';
import { db } from '@/database/init';
import { authRoute } from '@/http/auth.route';
import { yoga } from '@/http/graphql.route';
import { registerMiddleware } from '@/http/middleware';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

export const app = new Hono();
registerMiddleware(app);
app.use(logger());
app.route('/', authRoute);
app.all('/graphql', (c) => yoga.handle(c.req.raw));
app.get('/health', (c) => c.text('ok'));

app.get('/test', async (c) => {
  const data = await db.select().from(user).limit(1);
  return c.json(data);
});
