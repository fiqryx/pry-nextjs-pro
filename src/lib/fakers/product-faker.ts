import { z } from "zod"
import { createRandomMultiple } from "@/lib/faker"
import {
    productSchema,
    productStatusSchema
} from "@/types/product"

const products = z.array(productSchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => ({
        name: f.commerce.productName(),
        sku: f.commerce.isbn(),
        handle: f.commerce.productAdjective(),
        category: f.helpers.arrayElement(['healthcare', 'makeup', 'skincare']),
        type: f.helpers.arrayElement(['physical', 'digital', 'service']),
        tags: f.lorem.words({ min: 1, max: 5 }).replaceAll(' ', ', '),
        description: f.commerce.productDescription(),
        stock: f.number.int(100),
        price: f.number.float({ min: 100, max: 200, fractionDigits: 2 }),
        qty: f.number.int({ min: 1, max: 2 }),
        quantity: f.number.int({ min: 7, max: 10 }),
        height: f.number.float({ fractionDigits: 2 }),
        width: f.number.float({ fractionDigits: 2 }),
        length: f.number.int(50),
        weight: f.number.float({ fractionDigits: 2 }),
        images: f.helpers.arrayElements([
            { src: '/assets/product-1.jpg', filename: 'product-1.jpg' },
            { src: '/assets/product-2.jpg', filename: 'product-2.jpg' },
            { src: '/assets/product-3.jpg', filename: 'product-3.jpg' },
            { src: '/assets/product-4.jpg', filename: 'product-4.jpg' },
        ], { min: 1, max: 4 }),
        status: f.helpers.enumValue(productStatusSchema.enum),
    })
}))

export function getProducts(limit?: number) {
    if (limit) {
        return products.slice(0, limit);
    }
    return products
}

export function getProductById(id: string) {
    if (id === '1') {
        id = products[0].id
    }
    return products.find(v => v.id === id)
}