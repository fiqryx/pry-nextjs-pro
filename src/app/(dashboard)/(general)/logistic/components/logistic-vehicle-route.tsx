'use client'
import React from "react"
import { cn } from '@/lib/utils'
import { Vehicle } from "@/types/vehicle"
import { useVehicles } from "../use-vehicles"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DataTable } from "@/components/ui/data-table"

import {
    RouteIcon,
    TruckIcon
} from "lucide-react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

const columns: ColumnDef<Vehicle>[] = [
    {
        accessorKey: 'id',
        header: 'Vehicle',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full p-2">
                        <TruckIcon className="size-5" />
                    </Badge>
                    <span className="text-sm font-semibold">{row.getValue('id')}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'start',
        header: 'Starting route',
        enableHiding: false,
    },
    {
        accessorKey: 'end',
        header: 'Ending route',
        enableHiding: false,
    },
    {
        accessorKey: 'issues',
        header: 'Issue',
        enableHiding: false,
        cell: ({ row }) => {
            const { issues } = row.original;

            return (
                <Badge
                    className="rounded-full text-xs font-normal"
                    variant={cn(
                        !issues?.length && 'success',
                        issues?.length === 1 && 'warning',
                        issues && issues?.length > 1 && 'destructive',
                    ) as 'default'}
                >
                    {issues?.[0] ?? 'No issue'}
                </Badge>
            )
        }
    },
    {
        accessorKey: 'temp',
        header: 'Temperature',
        enableHiding: false,
        cell: ({ row }) => {
            const { temp } = row.original

            return (
                <div className="flex flex-col gap-3 mr-2">
                    <Progress value={temp} className="h-1.5" />
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <span className="text-sm font-semibold tracking-tight">
                            {temp <= 10 ? 'Very Good'
                                : temp <= 15 ? 'Good' : 'Bad'}
                        </span>
                        <span className="text-sm">{temp}°C</span>
                    </div>
                </div>
            )
        }
    },
]

export function LogisticVehicleRoute({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    const [vehicles] = useVehicles()

    return (
        <Card
            {...props}
            className={cn('w-full', className)}
        >
            <CardHeader>
                <div className="inline-flex items-center gap-2">
                    <Badge variant="primary" className="rounded-full p-2">
                        <RouteIcon />
                    </Badge>
                    <CardTitle>Vehcile on route</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <DataTable
                    data={vehicles}
                    columns={columns}
                    className="rounded-t-none"
                />
            </CardContent>
        </Card>
    )
}