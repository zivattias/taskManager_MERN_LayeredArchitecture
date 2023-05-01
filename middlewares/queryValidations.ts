import * as z from "zod";

export const getUserQuerySchema = z.object({
  user_id: z.string(),
});
