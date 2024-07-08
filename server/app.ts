import { Hono } from 'hono'
import type {Env, ExecutionContext} from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses.ts'
import { serveStatic } from 'hono/deno'
const app = new Hono()

app.use("*",logger())

app.route("/api/expenses",expensesRoute)

app.get("*", serveStatic({root: "./frontend/dist"}))
app.get("*", serveStatic({path: "./frontend/dist/index.html"}))

export default app