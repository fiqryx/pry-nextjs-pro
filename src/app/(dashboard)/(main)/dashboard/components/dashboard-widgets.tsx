"use client"

import React from "react"
import { cn } from "@/lib/utils"

import {
    Area,
    AreaChart,
    XAxis,
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    UsersIcon,
    ActivityIcon,
    CreditCardIcon,
    DollarSignIcon,
} from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"


export const widgets = [
    {
        label: 'Total revenue',
        income: '$45,231.89',
        summary: '+20.1%',
        icon: DollarSignIcon,
        chart: {
            config: {
                in: { label: "Income", color: "hsl(var(--chart-1))" },
                out: { label: "Outcome", color: "hsla(var(--chart-1), 0.5)" }
            },
            data: [
                { month: "Jan", in: 45001 },
                { month: "Feb", in: 18009 },
                { month: "Mar", in: 49002 },
                { month: "Apr", in: 19825 },
                { month: "May", in: 34009 },
                { month: "Jun", in: 45231 },
            ],
            dataKey: 'in',
            axisKey: 'month'
        }
    },
    {
        label: 'Subscriptions',
        income: '+2350',
        summary: '+180.1%',
        icon: UsersIcon,
        chart: {
            config: {
                in: { label: "Income", color: "hsl(var(--chart-1))" },
                out: { label: "Outcome", color: "hsla(var(--chart-1), 0.5)" }
            },
            data: [
                { month: "Jan", in: 800 },
                { month: "Feb", in: 1800 },
                { month: "Mar", in: 374 },
                { month: "Apr", in: 1800 },
                { month: "May", in: 980 },
                { month: "Jun", in: 2350 },
            ],
            dataKey: 'in',
            axisKey: 'month'
        }
    },
    {
        label: 'Sales',
        income: '+12,234',
        summary: '+19%',
        icon: CreditCardIcon,
        chart: {
            config: {
                in: { label: "Income", color: "hsl(var(--chart-1))" },
                out: { label: "Outcome", color: "hsla(var(--chart-1), 0.5)" }
            },
            data: [
                { month: "Jan", in: 7005 },
                { month: "Feb", in: 10860 },
                { month: "Mar", in: 4200 },
                { month: "Apr", in: 6300 },
                { month: "May", in: 9860 },
                { month: "Jun", in: 12234 },
            ],
            dataKey: 'in',
            axisKey: 'month'
        }
    },
    {
        label: 'Activity',
        income: '+573',
        summary: '+201',
        icon: ActivityIcon,
        chart: {
            config: {
                in: { label: "Income", color: "hsl(var(--chart-1))" },
                out: { label: "Outcome", color: "hsla(var(--chart-1), 0.5)" }
            },
            data: [
                { month: "Jan", in: 410 },
                { month: "Feb", in: 305 },
                { month: "Mar", in: 237 },
                { month: "Apr", in: 610 },
                { month: "May", in: 372 },
                { month: "Jun", in: 573 },
            ],
            dataKey: 'in',
            axisKey: 'month'
        }
    },
]

export function DashboardWidgets({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div {...props} className={cn('grid auto-rows-min', className)}>
            {widgets.map((item, idx) => (
                <Card key={idx}>
                    <CardHeader className="flex flex-row justify-between px-6 pt-6 pb-0">
                        <div className="flex flex-col gap-1">
                            <CardTitle className="tracking-tight text-sm font-semibold">{item.label}</CardTitle>
                            <CardDescription className="text-foreground">
                                <div className="text-2xl font-bold">{item.income}</div>
                                <p className="text-xs text-muted-foreground">{`${item.summary} from last month`}</p>
                            </CardDescription>
                        </div>
                        <item.icon className="h-8 w-8 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-2">
                        <ChartWidget
                            dataKey="in"
                            axisKey="month"
                            config={item.chart.config}
                            data={item.chart.data}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


function ChartWidget<T extends Record<string, string | number>>({
    config,
    className,
    data,
    dataKey,
    axisKey,
}: {
    config: ChartConfig
    className?: string
    data: T[]
    dataKey: Extract<keyof T, string>
    axisKey: Extract<keyof T, string>
}) {
    return (
        <ChartContainer config={config} className={cn("h-24 w-full", className)}>
            <AreaChart accessibilityLayer data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }} >
                <XAxis dataKey={axisKey} hide />
                <Area type="natural" dataKey={dataKey} fill="var(--color-in)" fillOpacity={0.4} stroke="var(--color-in)" />
            </AreaChart>
        </ChartContainer>
    )
}