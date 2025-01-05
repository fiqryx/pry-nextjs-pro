'use client'
import React from "react"
import { cn } from '@/lib/utils'

import { Wrench } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { ChartContainer } from "@/components/ui/chart"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

const data = [
    {
        condition: 'excellent',
        issue: 'No issues',
        fill: "hsl(var(--success))",
        data: [
            { name: 'x', value: 155, fill: "hsl(var(--success))" },
            { name: 'y', value: 26, fill: "hsl(var(--success) / 0.7)" },
        ]
    },
    {
        condition: 'good',
        issue: 'Minor issues',
        fill: "hsl(var(--warning))",
        data: [
            { name: 'x', value: 18, fill: "hsl(var(--warning))" },
            { name: 'y', value: 7, fill: "hsl(var(--warning) / 0.7)" },
        ]
    },
    {
        condition: 'bad',
        issue: 'Needs attention',
        fill: "hsl(var(--destructive))",
        data: [
            { name: 'x', value: 1, fill: "hsl(var(--destructive))" },
            { name: 'y', value: 11, fill: "hsl(var(--destructive) / 0.7)" },
        ]
    },
]

export function LogisticVehicleCondition({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    return (
        <Card
            {...props}
            className={cn('w-full', className)}
        >
            <CardHeader>
                <div className="inline-flex items-center gap-2">
                    <Badge variant="primary" className="rounded-full p-2">
                        <Wrench />
                    </Badge>
                    <CardTitle>Vehcile condition</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 gap-5">
                {data.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center border rounded-xl p-6 gap-6">
                        <h3 className="capitalize font-semibold leading-none tracking-tight">
                            {item.condition}
                        </h3>
                        <ChartContainer
                            config={{}}
                            className="aspect-square size-40"
                        >
                            <PieChart>
                                <Pie
                                    data={item.data}
                                    nameKey='name'
                                    dataKey='value'
                                    innerRadius={45}
                                />
                            </PieChart>
                        </ChartContainer>
                        <div className="flex flex-col items-center gap-1">
                            <h3 className="text-xl font-semibold leading-none tracking-tight">
                                {item.data.reduce(
                                    (total, dataItem) => total + dataItem.value, 0
                                )}
                            </h3>
                            <span className="text-sm text-muted-foreground tracking-tight">
                                {item.issue}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}