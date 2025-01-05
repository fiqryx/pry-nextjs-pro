import { z } from 'zod'
import { baseSchema } from './base'

export const jobsCategorySchema = z.enum([
    'freelance',
    'contract',
    'employee'
])

export const jobsSchema = baseSchema.extend({
    title: z.string(),
    category: jobsCategorySchema,
    tags: z.array(z.string()).optional(),
    startDate: z.date(),
    endDate: z.date(),
    budgetMin: z.number(),
    budgetMax: z.number(),
    describe: z.string().optional(),
})

export type Jobs = z.infer<typeof jobsSchema>
export type JobsCategory = z.infer<typeof jobsCategorySchema>