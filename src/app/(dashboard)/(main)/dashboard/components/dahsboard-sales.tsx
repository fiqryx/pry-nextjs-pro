"use client"

import React from "react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ArrowRightIcon,
    RotateCwIcon
} from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
} from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const config: ChartConfig = {
    desktop: {
        label: "This year",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Last year",
        color: "hsl(var(--chart-2) / 0.5)",
    },
}

const data = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
    { month: "Jul", desktop: 214, mobile: 140 },
    { month: "Aug", desktop: 89, mobile: 150 },
    { month: "Sep", desktop: 137, mobile: 200 },
    { month: "Oct", desktop: 224, mobile: 170 },
    { month: "Nov", desktop: 138, mobile: 230 },
    { month: "Dec", desktop: 387, mobile: 290 },
]

export function DashboardSales({
    ...props
}: React.ComponentProps<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader className="flex-row justify-between">
                <CardTitle className="text-lg">Sales</CardTitle>
                <Button variant="ghost" size="sm">
                    <RotateCwIcon />
                    Sync
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <ChartContainer
                    config={config}
                    className="aspect-auto h-60 lg:h-96 w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="justify-end border-t py-2">
                <Button variant="ghost" size="sm">
                    Overview
                    <ArrowRightIcon />
                </Button>
            </CardFooter>
        </Card>
    )
}