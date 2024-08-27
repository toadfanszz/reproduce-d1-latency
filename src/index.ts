import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/',async (c) => {
  const startTime = new Date();
  const select = await c.env.DB.prepare('SELECT 1;').all();
  const cost = new Date().getTime() - startTime.getTime();

  return c.json({ select, cost });
})

export default app