import { default as auth } from '@/configs/auth';
import { db } from '@/database/init';
import type { Hono } from 'hono';

/** Attach Drizzle DB and Better Auth session per request */
export function registerMiddleware(app: Hono) {
  app.use('*', async (c, next) => {
    // make drizzle db available
    // @ts-expect-error - augmenting context manually
    c.set('db', db);

    // read session from cookies/headers via Better Auth API
    // NOTE: API name is `auth.api.getSession()` in current builds
    // (it expects the Request or headers)
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    // @ts-expect-error - augmenting context manually
    c.set('session', session); // { user, session } | null

    await next();
  });
}
