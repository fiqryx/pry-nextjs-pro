'use client'
import React from "react"
import { cn, toDecimal } from "@/lib/utils"
import { useSummary } from "../use-invoices"

import {
    CheckIcon,
    ClockIcon,
    ReceiptTextIcon
} from "lucide-react"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function InvoiceWidget({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [summary] = useSummary()

    if (!summary) {
        return null
    }

    return (
        <div
            {...props}
            className={cn('grid lg:grid-cols-3 gap-5', className)}
        >
            <Card>
                <CardHeader className="flex flex-row items-center gap-6">
                    <div className="flex shrink-0 justify-center items-center size-12 border rounded-full">
                        <ReceiptTextIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle className="tracking-tight font-medium text-muted-foreground">
                            Total
                        </CardTitle>
                        <CardDescription>
                            <div className="text-2xl font-bold text-foreground">
                                ${toDecimal(summary.total)}
                            </div>
                            <p>from {summary.count.all} invoices</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-6">
                    <div className="flex shrink-0 justify-center items-center size-12 border rounded-full">
                        <CheckIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle className="tracking-tight font-medium text-muted-foreground">
                            Paid
                        </CardTitle>
                        <CardDescription>
                            <div className="text-2xl font-bold text-foreground">
                                ${toDecimal(summary.paid)}
                            </div>
                            <p>from {summary.count.paid} invoices</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center gap-6">
                    <div className="flex shrink-0 justify-center items-center size-12 border rounded-full">
                        <ClockIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle className="tracking-tight font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                        <CardDescription>
                            <div className="text-2xl font-bold text-foreground">
                                ${toDecimal(summary.pending)}
                            </div>
                            <p>from {summary.count.pending} invoices</p>
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}