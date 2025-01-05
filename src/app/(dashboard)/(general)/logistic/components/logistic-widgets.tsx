'use client'
import React from "react"
import { cn } from '@/lib/utils'
import { Badge } from "@/components/ui/badge"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    CircleAlert,
    Clock3,
    TriangleAlert
} from "lucide-react"


export function LogisticWidgets({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn('grid md:grid-cols-2 lg:grid-cols-4 gap-5', className)}
        >
            <Card>
                <CardContent className="flex flex-col p-6 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex justify-center items-center size-10">
                            <span className="relative flex justify-center items-center size-6">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-6 bg-primary"></span>
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold">38</h3>
                    </div>
                    <span className="text-muted-foreground tracking-tight">
                        On route vehicles
                    </span>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col p-6 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full p-1.5">
                            <TriangleAlert />
                        </Badge>
                        <h3 className="text-2xl font-bold">2</h3>
                    </div>
                    <span className="text-muted-foreground tracking-tight">
                        Vehicles with errors
                    </span>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col p-6 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full p-1.5">
                            <CircleAlert />
                        </Badge>
                        <h3 className="text-2xl font-bold">1</h3>
                    </div>
                    <span className="text-muted-foreground tracking-tight">
                        Vehicles deviated from route
                    </span>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex flex-col p-6 gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full p-1.5">
                            <Clock3 />
                        </Badge>
                        <h3 className="text-2xl font-bold">2</h3>
                    </div>
                    <span className="text-muted-foreground tracking-tight">
                        Late vehicles
                    </span>
                </CardContent>
            </Card>
        </div>
    )
}