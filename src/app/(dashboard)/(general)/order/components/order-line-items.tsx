import { cn } from "@/lib/utils"
import { Order } from "@/types/order"

import { ImageIcon } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface OrderLineItemsProps extends
    React.HTMLAttributes<HTMLDivElement> {
    data: Order
}

export function OrderLineItems({
    data,
    className,
    ...props
}: OrderLineItemsProps) {
    return (
        <div {...props} className={cn('rounded-md border', className)}>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead>
                            Product
                        </TableHead>
                        <TableHead>
                            Qty
                        </TableHead>
                        <TableHead className="text-end">
                            Unit price
                        </TableHead>
                        <TableHead className="text-end">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.products.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="flex items-center gap-1 max-w-40">
                                <Avatar className="size-10 text-sm rounded-lg">
                                    <AvatarImage src={item.images?.[0].src} alt={item.name} />
                                    <AvatarFallback className="rounded-lg">
                                        <ImageIcon className="text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                                <span title={item.name} className="truncate text-xs font-semibold">
                                    {item.name}
                                </span>
                            </TableCell>
                            <TableCell>
                                {item.qty}
                            </TableCell>
                            <TableCell className="text-end">
                                {`$${item.price}`}
                            </TableCell>
                            <TableCell className="text-end">
                                {`$${(item.qty ?? 0) * item.price}`}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="hover:bg-transparent">
                        <TableCell />
                        <TableCell colSpan={3} className="flex-1 p-4">
                            <div className="flex flex-col text-xs gap-4">
                                <div className="flex justify-between gap-2">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>${data.subtotal ?? '-'}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span className="text-muted-foreground">
                                        Discount
                                    </span>
                                    <span>${data.discount ?? '-'}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span className="text-muted-foreground">
                                        Shipping
                                    </span>
                                    <span>${data.shipping ?? '-'}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span className="text-muted-foreground">
                                        Taxes
                                    </span>
                                    <span>${data.tax ?? '-'}</span>
                                </div>
                                <div className="flex justify-between text-sm gap-2">
                                    <span className="text-muted-foreground font-bold">
                                        Total
                                    </span>
                                    <span className="font-bold">${data.total ?? '-'}</span>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}