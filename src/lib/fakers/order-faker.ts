import { z } from "zod"
import { createRandomMultiple } from "@/lib/faker"
import { orderSchema, orderStatusSchema } from "@/types/order"

import { toDecimal } from "../utils"
import { getCustomers } from "./customer-faker"
import { getProducts } from "./product-faker"

const customers = getCustomers()
const products = getProducts()

const orders = z.array(orderSchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => ({
        orderNo: 'late',
        customer: f.helpers.arrayElement(customers),
        products: f.helpers.arrayElements(products, { min: 1, max: 2 }),
        paymentMethod: {
            name: f.helpers.arrayElement(['Visa', 'Apple Pay', 'Google Pay', 'Master Card']),
            accountNo: f.finance.iban().replace(/.(?=.{4})/g, '*').slice(-8)
        },
        discount: f.number.float({ min: 0, max: 22, fractionDigits: 2 }),
        shipping: f.number.float({ min: 10, max: 50, fractionDigits: 2 }),
        taxRate: f.number.int({ min: 0, max: 25 }),
        status: f.helpers.enumValue(orderStatusSchema.enum),
    })
})).map((v, i) => {
    const orderNo = `ORD-${String(i + 1).padStart(3, "0")}`
    const subtotal = v.products.reduce((total, item) => total + ((item.qty ?? 0) * item.price), 0);
    const tax = toDecimal(subtotal * ((v.taxRate ?? 0) / 100));
    const total = toDecimal(subtotal - (v.discount ?? 0) + tax + (v.shipping ?? 0));

    return {
        ...v,
        orderNo,
        subtotal,
        tax,
        total
    }
})

export function getOrders(limit?: number) {
    if (limit) {
        return orders.slice(0, limit);
    }
    return orders
}

export function getOrderById(id: string) {
    if (id === '1') {
        id = orders[0].id
    }
    return orders.find(v => v.id === id)
}