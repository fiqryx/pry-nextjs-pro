"use client"

import React from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import {
    CalendarIcon,
    ChevronDown,
    ChevronRight,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis
} from "recharts"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const filterList = ['hour', 'day', 'week', 'month', 'year']

const chartConfig = {
    consumed: {
        label: "kWh",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

const consumedData = [
    { month: "January", consumed: 186 },
    { month: "February", consumed: 305 },
    { month: "March", consumed: 237 },
    { month: "April", consumed: 73 },
    { month: "May", consumed: 209 },
    { month: "June", consumed: 214 },
]

export function SmartHomePowerConsumed({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [filter] = React.useState("month")

    return (
        <div {...props} className={cn('grid gap-4', className)}>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="font-semibold tracking-tight">
                    Power Consumed
                </h1>
                <div className="flex flex-wrap items-center gap-3.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="capitalize">
                                <CalendarIcon />
                                {filter}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit mr-4">
                            <DropdownMenuRadioGroup value={filter}>
                                {filterList.map((value, idx) => (
                                    <DropdownMenuRadioItem
                                        key={idx}
                                        value={value}
                                        className="capitalize"
                                    >
                                        {value}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="icon" variant="outline" className="h-8">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="inline-flex items-center gap-3.5">
                        <span className="rounded-full size-1.5 bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background" />
                        <CardTitle className="text-sm">
                            Electricity Consumed
                        </CardTitle>
                    </div>
                    <CardDescription className="text-xs">
                        73% Spending
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={consumedData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value?.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey="consumed"
                                type="natural"
                                fill="var(--color-consumed)"
                                fillOpacity={0.4}
                                stroke="var(--color-consumed)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}