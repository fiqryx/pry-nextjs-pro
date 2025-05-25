import { z } from 'zod'
import { baseSchema } from "./base"

export const userAssigneeSchema = baseSchema.extend({
    name: z.string(),
    image: z.string(),
});

export const taskSchema = baseSchema.extend({
    name: z.string(),
    type: z.enum(['task', 'subtask', 'bug']),
    status: z.enum(['todo', 'on-progress', 'done']),
    assignee: userAssigneeSchema,
    startDate: z.date().optional(),
    endDate: z.date().optional()
});

export type Task = z.infer<typeof taskSchema>
export type UserAssignee = z.infer<typeof userAssigneeSchema>