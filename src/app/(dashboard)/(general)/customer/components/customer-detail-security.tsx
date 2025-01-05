'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { useCustomer } from "../use-customer";

import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"


export function CustomerDetailSecurity({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="flex-row justify-between items-center">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <ShieldAlert />
                    </Badge>
                    <CardTitle>
                        Security
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col mt-2 gap-4">
                <Button
                    className="w-fit"
                    variant="destructive"
                    onClick={() => console.log(customer.id)}
                >
                    Delete account
                </Button>
                <span className="text-muted-foreground">
                    A deleted customer cannot be restored. All data will be permanently removed.
                </span>
            </CardContent>
        </Card>
    )
}