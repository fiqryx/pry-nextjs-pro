"use client"

import React from "react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    MonitorIcon,
    TabletIcon,
    TabletSmartphoneIcon
} from "lucide-react"


const config: ChartConfig = {
    desktop: { label: "Desktop", color: "hsl(var(--chart-3))", icon: MonitorIcon },
    tablet: { label: "Tablet", color: "hsl(var(--chart-2))", icon: TabletSmartphoneIcon },
    mobile: { label: "Mobile", color: "hsl(var(--chart-1))", icon: TabletIcon },
}

const data = [
    { devices: "desktop", visitors: 32, fill: "var(--color-desktop)" },
    { devices: "tablet", visitors: 15, fill: "var(--color-tablet)" },
    { devices: "mobile", visitors: 53, fill: "var(--color-mobile)" },
]

export function DashboardTraffic({
    ...props
}: React.ComponentProps<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle className="text-lg">
                    Traffic source
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={config}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={data}
                            strokeWidth={5}
                            innerRadius={75}
                            dataKey='visitors'
                            nameKey='devices'
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="justify-center py-4 gap-8">
                {Object.keys(config).map((devices, idx) => (
                    <TrafficLabel key={idx} devices={devices} />
                ))}
            </CardFooter>
        </Card>
    )
}

function TrafficLabel({ devices }: { devices: string }) {
    const Icon = config[devices].icon
    const visitors = data.find(v => v.devices === devices)?.visitors

    return (
        <div className="flex flex-col items-center gap-1">
            {Icon && <Icon />}
            <span className="font-semibold">
                {config[devices].label}
            </span>
            {visitors && (
                <span className="text-sm text-muted-foreground">
                    {visitors}%
                </span>
            )}
        </div>
    )
}