'use client'
import React from "react"
import { cn } from '@/lib/utils'
import geography from '@/../public/assets/geo-topo-poland.json'

import { Box } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {
    Geography,
    Geographies,
    ComposableMap,
} from "react-simple-maps"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

export function LogisticVehicleDelivery({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const delivery = React.useMemo(
        () =>
            geography.objects.POL_adm1.geometries.reduce(
                (acc, geo) => {
                    if (geo.properties.sales) {
                        const { name, sales } = geo.properties;
                        acc.total += sales;
                        acc.data.push({ name, sales });
                    }
                    return acc;
                },
                {
                    total: 0,
                    data: [] as {
                        name: string
                        sales: number
                    }[],
                }
            ),
        []
    )

    return (
        <Card
            {...props}
            className={cn('w-full', className)}
        >
            <CardHeader>
                <div className="inline-flex items-center gap-2">
                    <Badge variant="primary" className="rounded-full p-2">
                        <Box />
                    </Badge>
                    <CardTitle>Vehicle delivery</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row flex-warp items-center p-6 gap-5">
                <ComposableMap
                    projection="geoMercator"
                    className="w-full size-72 animate-fade"
                    projectionConfig={{
                        scale: 4000,
                        center: [19.5, 52]
                    }}
                >
                    <Geographies geography={geography}>
                        {({ geographies }) => (
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    className={cn(
                                        'outline-hidden fill-gray-300 stroke-muted',
                                        geo.properties.sales && 'fill-primary/80 animate-pulse'
                                    )}
                                />
                            ))
                        )}
                    </Geographies>
                </ComposableMap>
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col lg:mb-4">
                        <span className="text-muted-foreground">
                            Total
                        </span>
                        <h3 className="text-2xl font-semibold">
                            {delivery.total}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {delivery.data.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-primary/80" />
                                <span className="text-muted-foreground">
                                    {item.name}
                                </span>
                                <span className="ml-auto">
                                    {item.sales}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}