'use client'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Order } from "@/types/order"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { OrderPaymentMethod } from "./order-payment-method"

import {
    ClockIcon,
    CircleMinus,
    CircleCheckBig,
} from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import React from "react"


const statusIcon = {
    completed: CircleCheckBig,
    pending: ClockIcon,
    rejected: CircleMinus
}

interface OrderDetailProps extends
    React.HTMLAttributes<HTMLDivElement> {
    data: Order
}

export function OrderDetail({
    data,
    className,
    ...props
}: OrderDetailProps) {
    const customer = data.customer
    const Icon = statusIcon[data.status]

    return (
        <div {...props} className={cn('rounded-md border', className)}>
            <Table>
                <TableBody>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="text-muted-foreground sm:w-40">
                            Customer
                        </TableCell>
                        <TableCell>
                            <Link
                                href={`/customer/${customer.id}`}
                                className={cn(buttonVariants({ variant: 'link' }), 'p-0 text-primary')}
                            >
                                {customer.name}
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="text-muted-foreground">
                            Address
                        </TableCell>
                        <TableCell>
                            {customer.address}
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="text-muted-foreground">
                            Date
                        </TableCell>
                        <TableCell>
                            {data.createdAt.toLocaleString('en', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            }).replace(' at ', ' ')}
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="text-muted-foreground">
                            Status
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" className="rounded-full capitalize text-xs font-normal p-1 gap-1">
                                <Icon
                                    className={cn(
                                        'w-4 h-4',
                                        data.status === 'completed' && 'text-success',
                                        data.status === 'pending' && 'text-warning',
                                        data.status === 'rejected' && 'text-destructive',
                                    )}
                                />
                                {data.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                        <TableCell className="text-muted-foreground">
                            Payment method
                        </TableCell>
                        <TableCell>
                            <OrderPaymentMethod {...data.paymentMethod} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}