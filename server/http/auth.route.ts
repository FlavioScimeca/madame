import { default as auth } from '@/configs/auth';
import { Hono } from 'hono';

export const authRoute = new Hono();

// Better Auth catch-all - handles all /auth/* routes
authRoute.all('/auth/*', async (c) => {
  const body = await c.req.json();
  console.log('parsing body', body);
  const response = await auth.api.signUpEmail({
    body: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });

  return c.json(response.user.name);
});
