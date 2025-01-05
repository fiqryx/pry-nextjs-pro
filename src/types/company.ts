import { z } from 'zod'
import { baseSchema } from './base'
import { jobsSchema } from './jobs'

export const memberSchema = baseSchema.extend({
    photo: z.string().optional(),
    name: z.string(),
    jobTitle: z.string(),
    skills: z.array(z.string()).default([])
})

export const reviewSchema = baseSchema.extend({
    title: z.string(),
    user: z.string(),
    photo: z.string().optional(),
    review: z.string().optional(),
    rate: z.number().min(0).max(5)
})

export const activitySchema = baseSchema.extend({
    activity: z.string(),
    member: memberSchema
})

export const companySchema = baseSchema.extend({
    name: z.string(),
    logo: z.string(),
    slogan: z.string().optional(),
    about: z.string().optional(),
    industry: z.string().optional(),
    size: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    site: z.string().optional(),
    members: z.array(memberSchema).default([]),
    reviews: z.array(reviewSchema).default([]),
    activities: z.array(activitySchema).default([]),
    jobs: z.array(jobsSchema),
    rate: z.number().min(0).max(5)
})

export type Member = z.infer<typeof memberSchema>
export type Review = z.infer<typeof reviewSchema>
export type Activity = z.infer<typeof activitySchema>
export type Company = z.infer<typeof companySchema>