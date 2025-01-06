import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().min(3, "Title is required").max(15, "Title is too long"),
  status: z.boolean().optional(),
});

export type TodoInput = z.infer<typeof TodoSchema>;
