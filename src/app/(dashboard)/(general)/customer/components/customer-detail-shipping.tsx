'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { useCustomer } from "../use-customer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Plus,
    Pencil,
    HomeIcon
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"


export function CustomerDetailShipping({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    return (
        <Card {...props} className={cn('', className)}>
            <CardHeader className="sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center gap-4">
                    <Badge variant="primary" className="rounded-full p-2">
                        <HomeIcon />
                    </Badge>
                    <CardTitle>
                        Shipping address
                    </CardTitle>
                </div>
                <Button variant="outline">
                    <Plus /> Add
                </Button>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-2 gap-4 ">
                <Card className="shadow-none">
                    <CardHeader>
                        <CardDescription className="text-base leading-tight">
                            {customer.address},
                        </CardDescription>
                        <CardDescription className="text-base leading-tight">
                            {customer.city}, {customer.country}
                        </CardDescription>
                        <CardDescription className="text-base leading-tight">
                            {customer.zipcode}
                        </CardDescription>
                        <div className="flex justify-between items-center">
                            <Badge className="rounded-full">
                                Primary
                            </Badge>
                            <Button variant="outline" size="sm">
                                <Pencil /> Edit
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            </CardContent>
        </Card>
    )
}