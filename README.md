## Demo Link

<https://reproduce-d1-latency.turbx.workers.dev/>

## Reproduce Steps

### 1. create

```sh
pnpm create cloudflare@latest reproduce-d1-latency

- choose `hono`

```

### 2. add d1 bindings And enable smart placement

- Note the Location we use is `Eastern North America`

```sh
pnpm run cf-typegen
```

### 3. modify index.ts

```ts
app.get('/',async (c) => {
  const startTime = new Date();
  const select = await c.env.DB.prepare('SELECT 1;').all();
  const cost = new Date().getTime() - startTime.getTime();

  return c.json({ select, cost });
})
```

### 4. deploy and visit api

```sh
pnpm run deploy
```

<https://reproduce-d1-latency.turbx.workers.dev/>

The output should be

```json
{
  "select": {
    "success": true,
    "meta": {
      "served_by": "v3-prod",
      "duration": 0.1486, // in milliseconds
      "changes": 0,
      "last_row_id": 0,
      "changed_db": false,
      "size_after": 12288,
      "rows_read": 0,
      "rows_written": 0
    },
    "results": [
      {
        "1": 1
      }
    ]
  },
  "cost": 289 // in milliseconds
}
```
