import { z } from 'zod'
import { createRandomMultiple } from '@/lib/faker'
import {
    customerSchema,
    customerStatusSchema,
    paymentStatusSchema
} from '@/types/customer'

const customers = z.array(customerSchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => ({
        name: f.person.fullName(),
        email: f.internet.email({ provider: 'example.dev' }),
        image: f.helpers.arrayElement([
            '/assets/avatar-1.jpg',
            '/assets/avatar-2.jpg',
            '/assets/avatar-3.jpg',
            '/assets/avatar-4.jpg',
            '/assets/avatar-5.jpg',
            '/assets/avatar-6.jpg',
            '/assets/avatar-7.jpg',
            '/assets/avatar-8.jpg',
        ]),
        phone: f.phone.number({ style: 'national' }),
        address: f.location.streetAddress({ useFullAddress: true }),
        city: f.location.city(),
        company: f.company.name(),
        country: f.location.country(),
        state: f.location.state(),
        zipcode: f.location.zipCode(),
        creditCard: f.finance.iban().replace(/.(?=.{4})/g, '*'),
        credit: f.number.int({ min: 0, max: 100 }),
        taxId: f.string.alpha(2).toUpperCase() + f.finance.accountNumber(),
        status: f.helpers.enumValue(customerStatusSchema.enum),
        payments: createRandomMultiple({
            count: 5,
            extends: (f) => ({
                amount: f.finance.amount({ min: 100, max: 1000, symbol: "$" }),
                invoiceId: "INV-" + f.finance.accountNumber(),
                status: f.helpers.enumValue(paymentStatusSchema.enum),
                date: f.date.recent({ days: 10 })
            }),
        }),
    })
}))

export function getCustomers(limit?: number) {
    if (limit) {
        return customers.slice(0, limit)
    }
    return customers
}

export function getCustomerById(id: string) {
    if (id === '1') {
        id = customers[0].id
    }
    return customers.find(v => v.id === id)
}