'use client'
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Invoice } from "@/types/invoice"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

import {
    ImageIcon,
    ClockIcon,
    CircleMinus,
    CircleCheckBig,
    ArrowRight,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"


const statusIcon = {
    paid: CircleCheckBig,
    pending: ClockIcon,
    canceled: CircleMinus
}

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'invoiceId',
        header: 'Invoice ID',
        enableHiding: false,
    },
    {
        accessorKey: 'order.customer.name',
        cell: ({ row }) => {
            const { name, image } = row.original.order.customer;

            return (
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="size-10 text-sm rounded-full">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="rounded-full">
                            <ImageIcon className="text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm w-24">
                        <span className="text-sm font-semibold">
                            {row.original.invoiceId}
                        </span>
                        <span title={name} className="text-xs text-muted-foreground">
                            {name}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "order.total",
        cell: ({ row }) => "$" + row.original.order.total,
    },
    {
        accessorKey: "issueDate",
        cell: ({ row }) => (
            <div className="flex flex-col text-sm w-24">
                <span className="truncate font-semibold">
                    Issued
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    {row.original.issueDate.toLocaleString('en', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "dueDate",
        cell: ({ row }) => (
            <div className="flex flex-col text-sm w-24">
                <span className="truncate font-semibold">
                    Due
                </span>
                <span className="truncate text-xs text-muted-foreground">
                    {row.original.dueDate.toLocaleString('en', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        cell: ({ row }) => {
            const { status } = row.original
            const Icon = statusIcon[status]

            return (
                <div className="flex justify-center">
                    <Badge variant="outline" className="w-fit text-xs capitalize rounded-full h-6 py-1 px-2 gap-1">
                        <Icon
                            className={cn(
                                'w-4 h-4',
                                status === 'paid' && 'text-success',
                                status === 'pending' && 'text-warning',
                                status === 'canceled' && 'text-destructive',
                            )}
                        />
                        {status}
                    </Badge>
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex justify-end px-2">
                <Link
                    href={`/invoice/${row.original.id}`}
                    className={buttonVariants({ size: 'icon', variant: 'ghost' })}
                >
                    <ArrowRight />
                </Link>
            </div>
        )
    }
]