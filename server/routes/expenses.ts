import { Hono, type Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number(),
});

type Expenses = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const expenses: Expenses[] = [
  { id: 1, title: "Rent", amount: 1000 },
  { id: 2, title: "Groceries", amount: 100 },
  { id: 3, title: "Gas", amount: 50 },
  { id: 4, title: "Insurance", amount: 200 },
  { id: 5, title: "Phone", amount: 50 },
];

export const expensesRoute = new Hono()
  .get("/", (c: Context) => {
    return c.json({ expenses: expenses });
  })
  .post("/", zValidator("json",createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    expenses.push({ ...expense, id: expenses.length + 1 });
    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const total = expenses.reduce((acc, exp) => (acc += exp.amount), 0);
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = expenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = expenses.splice(index, 1)[0];
    return c.json({ deletedExpense });
  });
