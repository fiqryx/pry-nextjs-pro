import { z } from "zod"

export const userSchema = z.object({
    id: z.string(),
    avatar: z.string().optional(),
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string()
})

export type User = z.infer<typeof userSchema>