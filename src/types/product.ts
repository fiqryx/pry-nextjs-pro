import { z } from "zod"
import { baseSchema } from "./base"

export const productStatusSchema = z.enum([
    'draft',
    'published'
])

export const imageSchema = z.object({
    src: z.string(),
    filename: z.string()
})

export const productSchema = baseSchema.extend({
    name: z.string(),
    sku: z.string(),
    handle: z.string().optional(),
    category: z.string(),
    type: z.string(),
    description: z.string().optional(),
    tags: z.string().optional(),
    stock: z.number(),
    price: z.number(),
    qty: z.number().optional(),
    quantity: z.number().optional(),
    barcode: z.string().optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    length: z.number().optional(),
    weight: z.number().optional(),
    images: z.array(imageSchema).optional(),
    status: productStatusSchema,
})

export type ProductStatus = z.infer<typeof productStatusSchema>
export type Product = z.infer<typeof productSchema>
