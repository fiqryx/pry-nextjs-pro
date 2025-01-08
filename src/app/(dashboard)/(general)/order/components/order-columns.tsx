"use client"
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Order } from "@/types/order"
import { ColumnDef } from "@tanstack/react-table"

import { OrderDetail } from "./order-detail"
import { Badge } from "@/components/ui/badge"
import { OrderLineItems } from "./order-line-items"
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { OrderPaymentMethod } from "./order-payment-method"
import { DataTableColumnHeader } from "@/components/ui/data-table"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Trash2,
    Ellipsis,
    ImageIcon,
    ClockIcon,
    Edit2Icon,
    CircleMinus,
    CircleCheckBig,
} from "lucide-react"
import {
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const statusIcon = {
    completed: CircleCheckBig,
    pending: ClockIcon,
    rejected: CircleMinus
}

export const orderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: 'orderNo',
        header: 'Order No',
        enableHiding: false,
    },
    {
        id: "select",
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: ({ row }) => {
            const { orderNo, products, total, createdAt } = row.original

            return (
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Badge variant="outline" className="flex flex-col items-center text-xs font-normal rounded-lg size-12">
                        <span className="uppercase">
                            {createdAt.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-lg font-semibold">
                            {String(createdAt.getDate()).padStart(2, "0")}
                        </span>
                    </Badge>
                    <div className="flex flex-col text-sm leading-tight min-w-24">
                        <span className="text-sm">{orderNo}</span>
                        <span className="text-xs text-muted-foreground lowercase">
                            {`${products.length} Products • $${total}`}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        id: 'paymentMethod.name',
        accessorKey: 'paymentMethod.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Payment method" />,
        cell: ({ row }) => <OrderPaymentMethod {...row.original.paymentMethod} />,
    },
    {
        id: 'customer.name',
        accessorKey: 'customer.name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
        cell: ({ row }) => {
            const { name, email, image } = row.original.customer

            return (
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="size-10 text-sm rounded-full">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="rounded-full">
                            <ImageIcon className="text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm max-w-32 lg:max-w-xs">
                        <span className="text-sm">
                            {name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                            {email}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const { status } = row.original
            const Icon = statusIcon[status]

            return (
                <Badge variant="outline" className="rounded-full capitalize text-xs font-normal p-1 gap-1">
                    <Icon
                        className={cn(
                            'w-4 h-4',
                            status === 'completed' && 'text-success',
                            status === 'pending' && 'text-warning',
                            status === 'rejected' && 'text-destructive',
                        )}
                    />
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">
                                Open menu
                            </span>
                            <Ellipsis className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <SheetTrigger asChild>
                            <DropdownMenuItem>
                                View
                            </DropdownMenuItem>
                        </SheetTrigger>
                        <DropdownMenuItem asChild>
                            <Link href={`/order/${row.original.id}`}>
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                            <DropdownMenuShortcut>
                                <Trash2 className="size-3" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <SheetDetail data={row.original} />
            </Sheet>
        )
    },
]

function SheetDetail({ data }: { data: Order }) {
    return (
        <SheetContent className="max-w-sm sm:max-w-lg h-full overflow-y-auto">
            <SheetHeader>
                <SheetTitle>
                    {data.orderNo}
                </SheetTitle>
            </SheetHeader>
            <div className="grid gap-8 py-4">
                <div className="grid gap-2">
                    <div className="flex justify-between gap-2">
                        <h4 className="font-semibold text-foreground">
                            Detail
                        </h4>
                        <Link
                            href={`/order/${data.id}`}
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            <Edit2Icon /> Edit
                        </Link>
                    </div>
                    <OrderDetail data={data} />
                </div>
                <div className="grid gap-2">
                    <h4 className="font-semibold text-foreground">
                        Line items
                    </h4>
                    <OrderLineItems data={data} />
                </div>
            </div>
        </SheetContent>
    )
}