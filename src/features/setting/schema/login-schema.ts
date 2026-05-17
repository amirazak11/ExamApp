import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().nonempty("First name is required"),
  password: z.string().nonempty("Password must be at least 6 chars"),
}).strict()