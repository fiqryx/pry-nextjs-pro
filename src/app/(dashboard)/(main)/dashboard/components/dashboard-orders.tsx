"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { getOrders } from "@/lib/fakers/order-faker"

import { ArrowRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const orders = getOrders()

export function DashboardOrders({
    ...props
}: React.ComponentProps<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                    Latest orders
                </CardTitle>
            </CardHeader>
            <CardContent className="border-y p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent hover:bg-accent">
                            <TableHead className="py-4">Order</TableHead>
                            <TableHead className="py-4">Customer</TableHead>
                            <TableHead className="py-4">Date</TableHead>
                            <TableHead className="py-4">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.slice(0, 6).map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-medium py-3">
                                    {item.orderNo}
                                </TableCell>
                                <TableCell className="font-medium py-3">
                                    {item.customer.name}
                                </TableCell>
                                <TableCell className="font-medium py-3">
                                    {item.createdAt?.toLocaleString('en', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell className="font-medium py-3.5">
                                    <Badge
                                        className={cn(
                                            'text-xs capitalize font-normal rounded-full',
                                            item.status === 'completed' && 'bg-success hover:bg-success/80',
                                            item.status === 'pending' && 'bg-warning hover:bg-warning/80',
                                            item.status === 'rejected' && 'bg-destructive hover:bg-destructive/80',
                                        )}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-end py-2">
                <Button variant="ghost" size="sm">
                    View all
                    <ArrowRightIcon />
                </Button>
            </CardFooter>
        </Card>
    )
}