import { z } from 'zod'
import { baseSchema } from './base'
import { orderSchema } from './order'

export const invoiceSummary = z.object({
    total: z.number(),
    paid: z.number(),
    pending: z.number(),
    canceled: z.number(),
    count: z.object({
        all: z.number(),
        paid: z.number(),
        pending: z.number(),
        canceled: z.number(),
    }),
})

export const invoiceStatusSchema = z.enum([
    'pending',
    'paid',
    'canceled'
])

export const invoiceSchema = baseSchema.extend({
    invoiceId: z.string(),
    issueNo: z.string(),
    issueDate: z.date(),
    dueDate: z.date(),
    order: orderSchema,
    status: invoiceStatusSchema
})

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>
export type InvoiceSummary = z.infer<typeof invoiceSummary>
export type Invoice = z.infer<typeof invoiceSchema>
export type InvoiceWithSummary = {
    invoices: Invoice[]
    summary: InvoiceSummary
}