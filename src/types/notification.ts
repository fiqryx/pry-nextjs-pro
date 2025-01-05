import { z } from 'zod'
import { baseSchema } from './base'


export const notificationSchema = baseSchema.extend({
    name: z.string(),
    avatar: z.string(),
    message: z.string(),
    date: z.date(),
})

export type Notification = z.infer<typeof notificationSchema>