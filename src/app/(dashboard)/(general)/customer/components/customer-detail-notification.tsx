'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { useCustomer } from "../use-customer";
import { ColumnDef } from "@tanstack/react-table";

import { MailIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


type Notifications = {
    type: string
    status: 'pending' | 'delivered'
    date: Date
}

export const notifications: Notifications[] = [
    {
        type: 'Refund request approved',
        status: 'pending',
        date: addDays(new Date(), -2)
    },
    {
        type: 'Order confirmation',
        status: 'delivered',
        date: addDays(new Date(), -1)
    },
]


export const notificationColumns: ColumnDef<Notifications>[] = [
    {
        accessorKey: "type",
        header: () => 'Type',
        cell: ({ row }) => row.getValue("type"),
    },
    {
        accessorKey: "status",
        header: () => 'Status',
        cell: ({ row }) => {
            const { status } = row.original
            return (
                <Badge
                    variant={cn(
                        status === 'delivered' && 'success',
                        status === 'pending' && 'warning',
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


export function CustomerDetailNotification({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <MailIcon />
                    </Badge>
                    <CardTitle>
                        Notifications
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row justify-between gap-2">
                    <Select defaultValue="send_invoice">
                        <SelectTrigger className="max-w-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="send_invoice">
                                    Resend last invoice
                                </SelectItem>
                                <SelectItem value="send_password_reset">
                                    Send password reset
                                </SelectItem>
                                <SelectItem value="send_verification">
                                    Send verification
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <MailIcon /> Send email
                    </Button>
                </div>
                <DataTable data={notifications} columns={notificationColumns} />
            </CardContent>
        </Card>
    )
}