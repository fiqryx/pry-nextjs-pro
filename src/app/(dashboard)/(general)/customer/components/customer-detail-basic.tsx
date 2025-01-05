'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { Customer } from "@/types/customer";
import { useCustomer } from "../use-customer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
    UserRound,
    Pencil
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

const keys: Extract<keyof Customer, string>[] = ['name', 'email', 'phone', 'company']

export function CustomerDetailBasic({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    const items = Object.keys(customer).filter(
        value => keys.includes(value as keyof Customer)
    )

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <UserRound />
                    </Badge>
                    <CardTitle>
                        Basic detail
                    </CardTitle>
                </div>
                <Button variant="outline" className="h-6 w-6 p-4">
                    <Pencil />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2 border-b text-sm py-4">
                    <span className="text-muted-foreground">
                        Customer ID
                    </span>
                    <Badge variant="secondary" className="w-fit">
                        {customer.id}
                    </Badge>
                </div>
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2 border-b text-sm py-4">
                        <span className="text-muted-foreground capitalize">
                            {item}
                        </span>
                        <span>
                            {String(customer[item as keyof Customer])}
                        </span>
                    </div>
                ))}
                <div className="flex flex-col gap-2 text-sm pt-4">
                    <span className="text-muted-foreground">
                        Credit
                    </span>
                    <div className="flex items-center gap-4 text-xs">
                        <Progress value={customer.credit} className="h-1" />
                        <div className="text-muted-foreground text-end">
                            {customer.credit}%
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}