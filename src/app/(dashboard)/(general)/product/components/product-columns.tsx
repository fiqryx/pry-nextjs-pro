"use client"
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/product"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table"

import {
    Clock,
    Trash2,
    Ellipsis,
    ImageIcon,
    CircleCheckBig
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
    draft: Clock,
    published: CircleCheckBig,
}

export const productColumns: ColumnDef<Product>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            const { name, images, category } = row.original

            return (
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-10 w-10 text-sm rounded-lg">
                        <AvatarImage src={images?.[0].src} alt={name} />
                        <AvatarFallback className="rounded-lg">
                            <ImageIcon className="text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm leading-tight max-w-xs">
                        <span className="text-sm">
                            {name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {category}
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "sku",
        header: ({ column }) => <DataTableColumnHeader column={column} title="SKU" />,
        cell: ({ row }) => row.getValue("sku"),
    },
    {
        accessorKey: "stock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
        cell: ({ row }) => row.getValue("stock")
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => '$' + row.getValue("price")
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
                            status === 'published' && 'text-success',
                            status === 'draft' && 'text-muted-foreground',
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
                <Sheet>
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
                            <DropdownMenuSeparator />
                            <SheetTrigger asChild>
                                <DropdownMenuItem>
                                    View
                                </DropdownMenuItem>
                            </SheetTrigger>
                            <DropdownMenuItem asChild>
                                <Link href={`/product/${id}`}>
                                    Edit
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

                    <SheetDetail data={row.original} />
                </Sheet>
            )
        },
    },
]

function SheetDetail({ data }: { data: Product }) {
    const { status } = data;
    const StatusIcon = statusIcon[status];

    return (
        <SheetContent className="max-w-sm sm:max-w-lg h-full overflow-y-auto">
            <SheetHeader>
                <SheetTitle>{data.name}</SheetTitle>
            </SheetHeader>
            <div className="grid gap-8 py-4">
                <div className="grid gap-2">
                    <h4 className="font-semibold text-foreground">
                        Detail
                    </h4>
                    <div className="border rounded-md">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Name
                                    </TableCell>
                                    <TableCell>{data.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Category
                                    </TableCell>
                                    <TableCell>{data.category}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Type
                                    </TableCell>
                                    <TableCell>{data.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Tags
                                    </TableCell>
                                    <TableCell>{data.tags}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Price
                                    </TableCell>
                                    <TableCell>{`$${data.price}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="rounded-full capitalize text-xs font-normal p-1 gap-1">
                                            <StatusIcon
                                                className={cn(
                                                    'w-4 h-4',
                                                    status === 'published' && 'text-success',
                                                    status === 'draft' && 'text-muted-foreground',
                                                )}
                                            />
                                            {status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Created at
                                    </TableCell>
                                    <TableCell>
                                        {data.createdAt.toLocaleString('en', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="grid gap-2">
                    <h4 className="font-semibold text-foreground">
                        Images
                    </h4>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Image
                                    </TableHead>
                                    <TableHead>
                                        File name
                                    </TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <Avatar className="h-10 w-10 text-sm rounded-lg">
                                            <AvatarImage src={data.images?.[0].src} alt={data.name} />
                                            <AvatarFallback className="rounded-lg">
                                                <ImageIcon className="text-muted-foreground" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>product-1.png</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="text-xs capitalize rounded-full gap-1 h-6 p-2">
                                            Primary
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="grid gap-2">
                    <h4 className="font-semibold text-foreground">
                        Stock & Inventory
                    </h4>
                    <div className="border rounded-md">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        SKU
                                    </TableCell>
                                    <TableCell>{data.sku}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Barcode
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        None
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Quantity
                                    </TableCell>
                                    <TableCell>{data.quantity}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Height
                                    </TableCell>
                                    <TableCell>{data.height} cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Width
                                    </TableCell>
                                    <TableCell>{data.width} cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Length
                                    </TableCell>
                                    <TableCell>{data.length} cm</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="text-muted-foreground">
                                        Weight
                                    </TableCell>
                                    <TableCell>{data.weight} cm</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </SheetContent>
    )
}