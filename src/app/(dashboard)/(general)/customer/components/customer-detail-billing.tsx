'use client'
import React from "react";
import { camelCaseToText, cn } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { useCustomer } from "../use-customer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Pencil,
    CreditCard
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

const keys: Extract<keyof Customer, string>[] = [
    'creditCard', 'country', 'state', 'city', 'address', "taxId"
]

export function CustomerDetailBilling({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    const items = Object.keys(customer).filter(
        v => keys.includes(v as keyof Customer)
    )

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <CreditCard />
                    </Badge>
                    <CardTitle>
                        Billing detail
                    </CardTitle>
                </div>
                <Button variant="outline">
                    <Pencil /> Edit
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-5 border-b text-sm">
                        <span className="text-muted-foreground">
                            {item !== 'taxId' ? camelCaseToText(item) : 'Tax'}
                        </span>
                        <span className="col-span-4">
                            {String(customer[item as keyof Customer])}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}