import { z } from 'zod'
import { getOrders } from './order-faker'
import { createRandomMultiple } from '@/lib/faker'

import {
    InvoiceStatus,
    InvoiceWithSummary
} from "@/types/invoice";
import {
    Invoice,
    invoiceSchema,
    invoiceStatusSchema,
    InvoiceSummary
} from '@/types/invoice'

const orders = getOrders()

const invoices = z.array(invoiceSchema).parse(createRandomMultiple({
    count: 20,
    extends: (f) => ({
        invoiceId: "INV-" + f.finance.accountNumber(),
        issueNo: f.string.alpha(2).toUpperCase() + f.finance.accountNumber(),
        issueDate: f.date.recent({ days: 10 }),
        dueDate: f.date.soon({ days: 10 }),
        order: f.helpers.arrayElement(orders),
        status: f.helpers.enumValue(invoiceStatusSchema.enum),
    })
})).sort((a, b) =>
    b.issueDate.getTime() - a.issueDate.getTime()
)

export function getInvoices(limit?: number): InvoiceWithSummary {
    const summary = reducer(invoices)

    if (limit) {
        return { invoices: invoices.slice(0, limit), summary }
    }

    return { invoices, summary }
}

export function getInvoiceById(id: string) {
    if (id === '1') {
        id = invoices[0].id
    }
    return invoices.find(v => v.id === id)
}

export function getInvoiceSummary(invoices: Invoice[]) {
    return reducer(invoices)
}

function reducer<T extends Invoice>(invoices: T[]): InvoiceSummary {
    return invoices.reduce((acc, v) => {
        const total = v.order.total ?? 0;

        acc.total += total;
        acc.count.all += 1;

        if (v.status === 'paid') {
            acc.paid += total;
            acc.count.paid += 1;
        } else if (v.status === 'pending') {
            acc.pending += total;
            acc.count.pending += 1;
        } else if (v.status === 'canceled') {
            acc.canceled += total;
            acc.count.canceled += 1;
        }

        return acc;
    }, {
        total: 0,
        paid: 0,
        pending: 0,
        canceled: 0,
        count: { all: 0, paid: 0, pending: 0, canceled: 0 }
    })
}


export function getInvoicesGroupByStatus({
    invoices,
    pageIndex,
    pageSize,
}: {
    invoices: Invoice[];
    pageIndex: number;
    pageSize: number;
}): Record<InvoiceStatus, Invoice[]> {
    const grouped: Record<string, Invoice[]> = invoices.reduce((acc, invoice) => {
        acc[invoice.status] = acc[invoice.status] || [];
        acc[invoice.status].push(invoice);
        return acc;
    }, {} as Record<string, Invoice[]>);

    const statuses = Object.keys(grouped);
    const totalRecords = pageSize;
    const result: Record<string, Invoice[]> = {};
    let remainingRecords = totalRecords;
    let offset = pageIndex * pageSize;

    while (remainingRecords > 0 && statuses.length > 0) {
        const perGroup = Math.ceil(remainingRecords / statuses.length);

        for (let i = statuses.length - 1; i >= 0 && remainingRecords > 0; i--) {
            const status = statuses[i];
            const group = grouped[status];

            if (offset >= group.length) {
                offset -= group.length;
                statuses.splice(i, 1);
                continue;
            }

            const slice = group.slice(offset, offset + Math.min(perGroup, remainingRecords));
            result[status] = (result[status] || []).concat(slice);

            offset = 0;
            remainingRecords -= slice.length;

            if (slice.length < perGroup || group.length <= result[status].length) {
                statuses.splice(i, 1);
            }
        }
    }

    return result;
}