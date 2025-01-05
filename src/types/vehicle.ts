import { z } from 'zod'
import { baseSchema } from "./base"

export const vehicleSchema = baseSchema.extend({
    start: z.string(),
    end: z.string(),
    temp: z.number(),
    issues: z.array(z.string()).optional(),
    location: z.object({
        region: z.string(),
        coordinates: z.tuple([z.number(), z.number()]),
    }),
    tracks: z.array(z.object({
        status: z.string(),
        timestamp: z.date()
    }))
})

export type Vehicle = z.infer<typeof vehicleSchema>