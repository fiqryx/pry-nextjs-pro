'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useOrder } from "../use-order"

import { Badge } from "@/components/ui/badge"
import { CreditCardIcon } from "lucide-react"
import { OrderLineItems } from "./order-line-items"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"


export function OrderDetailSummary({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [order] = useOrder()

    if (!order) {
        return null
    }

    return (
        <div {...props} className={cn('w-full', className)}>
            <Card>
                <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-4">
                        <Badge variant="primary" className="rounded-full p-2">
                            <CreditCardIcon />
                        </Badge>
                        <CardTitle>
                            Checkout summary
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <OrderLineItems data={order} />
                </CardContent>
            </Card>
        </div>
    )
}