"use client"

import React from "react"
import { Product } from "@/types/product"
import { Button } from "@/components/ui/button"

import {
    ArrowRightIcon,
    EllipsisVerticalIcon,
    ImageIcon
} from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

interface DashboardProductsProps extends
    React.ComponentProps<typeof Card> {
    products: Product[]
}


export function DashboardProducts({
    products,
    ...props
}: DashboardProductsProps) {
    return (
        <Card {...props}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                    Latest products
                </CardTitle>
            </CardHeader>
            <CardContent className="border-y p-0">
                <Table>
                    <TableBody>
                        {products.map((item, idx) => (
                            <TableRow key={idx} className="hover:bg-transparent">
                                <TableCell className="flex flex-wrap items-center gap-2 px-4 py-3">
                                    <Avatar className="size-12 text-sm rounded-lg">
                                        <AvatarImage src={item.images?.[0].src} alt={item.images?.[0].filename} />
                                        <AvatarFallback className="rounded-lg">
                                            <ImageIcon className="text-muted-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1">
                                        <span title={item.name} className="truncate font-semibold">
                                            {item.name}
                                        </span>
                                        <span className="truncate text-sm text-muted-foreground">
                                            Updated {item.updatedAt?.toLocaleString('en', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <EllipsisVerticalIcon />
                                    </Button>
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