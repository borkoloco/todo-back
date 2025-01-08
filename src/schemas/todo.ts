import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.boolean().optional(),
});

export type TodoInput = z.infer<typeof TodoSchema>;
