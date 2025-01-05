'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { Payment } from "@/types/customer";
import { useCustomer } from "../use-customer";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import {
    Plus,
    ShoppingCart
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

export const paymentColumns: ColumnDef<Payment>[] = [
    {
        accessorKey: "invoiceId",
        header: () => 'Invoice ID',
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {row.getValue("invoiceId")}
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => 'Amount',
        cell: ({ row }) => (
            <div className="text-muted-foreground">
                {row.getValue("amount")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => 'Status',
        cell: ({ row }) => {
            const { status } = row.original
            return (
                <Badge
                    variant={cn(
                        status === 'completed' && 'success',
                        status === 'refunded' && 'destructive',
                    ) as 'default'}
                    className="rounded-full font-normal capitalize"
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "date",
        header: () => 'Date',
        cell: ({ row }) => {
            const date = row.original.date.toLocaleString('en', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            })

            return <p className="text-muted-foreground">{date}</p>
        },
    },
]

export function CustomerDetailPayment({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    const summary = (customer.payments ?? []).reduce(
        (acc, v) => {
            const amount = parseFloat(v.amount.replace('$', ''));

            if (v.status === 'completed') {
                acc[1].value = `$${(parseFloat(acc[1].value.replace('$', '')) + amount).toFixed(2)}`;
            } else if (v.status === 'refunded') {
                acc[2].value = `$${(parseFloat(acc[2].value.replace('$', '')) + amount).toFixed(2)}`;
            }

            return acc;
        },
        [
            { label: 'Total orders', value: String(customer.payments?.length || 0) },
            { label: 'Orders value', value: '$0.00' },
            { label: 'Refunds', value: '$0.00' },
        ]
    )

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <ShoppingCart />
                    </Badge>
                    <CardTitle>
                        Payments
                    </CardTitle>
                </div>
                <Button variant="outline">
                    <Plus /> Create payment
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="grid gap-4 lg:grid-cols-3">
                    {summary.map((item, idx) => (
                        <Card key={idx} className="shadow-none">
                            <CardHeader>
                                <CardTitle>
                                    {item.label}
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    {item.value}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <DataTable
                    columns={paymentColumns}
                    data={customer.payments ?? []}
                />
            </CardContent>
        </Card>
    )
}