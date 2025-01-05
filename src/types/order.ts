import { z } from "zod"
import { baseSchema } from "./base"
import { customerSchema } from "./customer"
import { productSchema } from "./product"

export const orderStatusSchema = z.enum([
    'pending',
    'completed',
    'rejected'
])

export const orderSchema = baseSchema.extend({
    orderNo: z.string(),
    customer: customerSchema,
    products: z.array(productSchema),
    paymentMethod: z.object({
        name: z.string(),
        accountNo: z.string(),
    }),
    subtotal: z.number().optional(),
    discount: z.number().optional(),
    shipping: z.number().optional(),
    taxRate: z.number().optional(),
    tax: z.number().optional(),
    total: z.number().optional(),
    status: orderStatusSchema
})

export type Order = z.infer<typeof orderSchema>

export type OrderStatus = z.infer<typeof orderStatusSchema>
