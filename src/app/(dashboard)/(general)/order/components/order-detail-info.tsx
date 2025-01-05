'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useOrder } from "../use-order"

import { OrderDetail } from "./order-detail"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
    Edit2Icon,
    CreditCardIcon,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"


export function OrderDetailInfo({
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
                            Order information
                        </CardTitle>
                    </div>
                    <Button variant="outline">
                        <Edit2Icon /> Edit
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <OrderDetail data={order} />
                </CardContent>
            </Card>
        </div>
    )
}