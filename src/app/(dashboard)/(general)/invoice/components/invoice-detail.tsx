'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useInvoice } from "../use-invoices"
import { PyramidIcon } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableHead,
    TableBody,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"

export function InvoiceDetail({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [invoice] = useInvoice()

    if (!invoice) {
        return null
    }

    const order = invoice.order;
    const customer = order.customer

    return (
        <div
            {...props}
            className={cn('space-y-8', className)}
        >
            <Card>
                <CardHeader className="flex-row justify-between items-center">
                    <CardTitle className="text-4xl font-medium">
                        Invoice
                    </CardTitle>
                    <PyramidIcon className="size-12" />
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    <div className="w-full max-w-xs flex flex-col text-sm gap-4">
                        <div className="grid grid-cols-2 items-center gap-2">
                            <span>Number</span>
                            <span>: {invoice.invoiceId}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <span>Due date</span>
                            <span>
                                : {invoice.dueDate.toLocaleString('en', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <span>Issue date</span>
                            <span>
                                : {invoice.issueDate.toLocaleString('en', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <span>Issuer VAT No</span>
                            <span>: {invoice.issueNo}</span>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <h6 className="font-semibold tracking-tight">
                                Pry IO
                            </h6>
                            <p className="text-sm leading-relaxed">
                                2674 Alfred Drive<br />
                                Brooklyn, New York, United States<br />
                                11206<br />
                                accounts@pry.io<br />
                                (+1) 757 737 1980<br />
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h6 className="font-semibold tracking-tight">
                                Billed to
                            </h6>
                            <p className="text-sm leading-relaxed">
                                {customer.name}<br />
                                {customer.company}<br />
                                {customer.address}<br />
                                {customer.city}, {customer.country}<br />
                                {customer.zipcode}<br />
                                {invoice.issueNo}<br />
                            </p>
                        </div>
                    </div>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted hover:bg-muted">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Unit price</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead className="text-end">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.products.map((item, idx) => (
                                    <TableRow key={idx} className="hover:bg-transparent">
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell className="text-end">
                                            ${item.price * (item.qty ?? 0)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-full max-w-sm flex flex-col gap-2 px-2">
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span>{order.subtotal ? `$${order.subtotal}` : '-'}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">
                                    Discount
                                </span>
                                <span>
                                    {order.discount ? `$${order.discount}` : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">
                                    Shipping
                                </span>
                                <span>
                                    {order.shipping ? `$${order.shipping}` : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span>{order.tax ? `$${order.tax}` : '-'}</span>
                            </div>
                            <div className="flex justify-between font-bold gap-2">
                                <span className="text-muted-foreground">
                                    Total
                                </span>
                                <span>{order.total ? `$${order.total}` : '-'}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="flex flex-col p-6 pt-0">
                    <h6 className="font-semibold tracking-tight">
                        Notes
                    </h6>
                    <span className="text-sm text-muted-foreground">
                        Please make sure you have the right bank registration number as I had issues before and make sure you cover transfer expenses.
                    </span>
                </div>
            </Card>
        </div>
    )
}