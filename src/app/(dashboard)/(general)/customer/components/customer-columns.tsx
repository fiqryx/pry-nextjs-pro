"use client"
import React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

import type { Customer } from "@/types/customer"
import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { DataTableColumnHeader } from "@/components/ui/data-table"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Trash2,
    Ellipsis,
    ClockIcon,
    CircleMinus,
    CircleCheckBig,
} from "lucide-react"
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
    active: CircleCheckBig,
    pending: ClockIcon,
    blocked: CircleMinus
}

export const customerColumns: ColumnDef<Customer>[] = [
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
        accessorKey: 'email',
        header: 'Email',
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            const { name, image, email } = row.original

            return (
                <div className="flex items-center gap-2 px-1 py-1.5 w-fit">
                    <Avatar className="h-10 w-10 text-sm">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>
                            {name.slice(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-tight max-w-32 lg:max-w-xs">
                        <span className="text-sm">{name}</span>
                        <span className="text-xs text-muted-foreground truncate">{email}</span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'credit',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Credit" />,
        cell: ({ row }) => (
            <div className="flex flex-col px-4 gap-1 items-end">
                <div className="text-muted-foreground">{row.getValue('credit')}%</div>
                <Progress value={row.getValue('credit')} className="h-1 min-w-24" />
            </div>
        )
    },
    {
        accessorKey: "phone",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
        cell: ({ row }) => row.getValue("phone")
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created at" />,
        cell: ({ row }) => row.original.createdAt.toLocaleString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        })
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
                            status === 'active' && 'text-success',
                            status === 'pending' && 'text-warning',
                            status === 'blocked' && 'text-destructive',
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
        cell: ({ row }) => {
            const { id } = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">
                                Open menu
                            </span>
                            <Ellipsis className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(id)
                                toast('Copied')
                            }}
                        >
                            Copy customer ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/customer/${id}`}>
                                View details
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                            <DropdownMenuShortcut>
                                <Trash2 className="w-3 h-3" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]