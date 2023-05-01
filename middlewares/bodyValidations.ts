import * as z from "zod";

export const createTaskBodySchema = z.object({
  title: z.string().max(128).min(1),
  description: z.string().max(100).optional(),
  isDone: z.boolean(),
  user_id: z.string(),
});

export const createUserBodySchema = z.object({
  email: z
    .string()
    .regex(
      RegExp(
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      )
    ),
  firstName: z.string(),
  password: z.string(),
});

export const updateUserBodySchema = z.object({
  email: z
    .string()
    .regex(
      RegExp(
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      )
    )
    .optional(),
  firstName: z.string().optional(),
  password: z.string().optional(),
});
