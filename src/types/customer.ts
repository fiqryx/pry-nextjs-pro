import { z } from 'zod'
import { baseSchema } from './base'

export const customerStatusSchema = z.enum([
    'active',
    'blocked',
    'pending',
])

export const paymentStatusSchema = z.enum([
    'completed',
    'refunded'
])

export const paymentSchema = z.object({
    id: z.string(),
    amount: z.string(),
    invoiceId: z.string(),
    date: z.date(),
    status: paymentStatusSchema,
})

export const customerSchema = baseSchema.extend({
    name: z.string(),
    image: z.string().optional(),
    email: z.string(),
    phone: z.string(),
    company: z.string(),
    creditCard: z.string(),
    credit: z.number(),
    country: z.string(),
    city: z.string(),
    address: z.string(),
    state: z.string(),
    zipcode: z.string(),
    taxId: z.string().optional(),
    shipping: z.boolean().optional(),
    timezone: z.string().default('new_york'),
    language: z.string().default('english'),
    currency: z.string().default('US').optional(),
    payments: z.array(paymentSchema).optional(),
    status: customerStatusSchema,
})

export type Payment = z.infer<typeof paymentSchema>

export type Customer = z.infer<typeof customerSchema>