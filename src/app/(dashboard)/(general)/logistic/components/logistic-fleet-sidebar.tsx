'use client'
import React from "react"
import { useMap } from "react-map-gl"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import { Plus, Truck } from "lucide-react"
import { useVehicle, useVehicles } from "../use-vehicles"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineDot,
    TimelineContent,
    TimelineContentLabel,
    TimelineContentDescription
} from "@/components/ui/timeline"


export function LogisticFleetSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const { fleet_map } = useMap()
    const [vehicles] = useVehicles()
    const [selected, setSelected] = useVehicle()

    return (
        <Sidebar {...props}>
            <SidebarHeader className="gap-3.5 border-b p-4">
                <h3 className="font-semibold text-foreground">
                    Fleet
                </h3>
                <SidebarMenuButton variant="outline" className="justify-center">
                    <Plus />
                    Add vehicle
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="px-0">
                    <SidebarMenu className="gap-0">
                        {vehicles.map((item, idx) => (
                            <Collapsible
                                key={idx}
                                className="group/collapsible"
                                open={selected?.id === item.id}
                                onOpenChange={() => {
                                    if (selected?.id === item.id) {
                                        setSelected(undefined)
                                        fleet_map?.flyTo({ zoom: 5 })
                                    } else {
                                        setSelected(item)
                                        fleet_map?.flyTo({ zoom: 13, center: item.location.coordinates })
                                    }
                                }}
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <div className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
                                            <div className="flex w-full items-center gap-2">
                                                <Badge variant="secondary" className="rounded-full border-input p-2">
                                                    <Truck className="size-5" />
                                                </Badge>
                                                <span className="font-semibold tracking-tight leading-none">
                                                    {item.id}
                                                </span>
                                            </div>
                                            <span className="line-clamp-1 whitespace-break-spaces text-xs">
                                                {item.start}
                                            </span>
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="border-b p-4 space-y-2 ease-linear duration-200">
                                        <span className="text-xs">
                                            Temperature
                                            ({item.temp <= 10 ? 'very Good'
                                                : item.temp <= 15 ? 'good' : 'bad'})
                                        </span>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center gap-4">
                                                <Progress value={item.temp} className="h-1.5" />
                                                <span className="text-sm">
                                                    {item.temp}°C
                                                </span>
                                            </div>
                                            <Timeline size="sm">
                                                {item.tracks?.map((v, idx) => (
                                                    <TimelineItem key={idx}>
                                                        <TimelineConnector hideLine={idx === item.tracks.length - 1}>
                                                            <TimelineDot />
                                                        </TimelineConnector>
                                                        <TimelineContent>
                                                            <TimelineContentLabel className="text-xs">
                                                                {v.status}
                                                            </TimelineContentLabel>
                                                            <TimelineContentDescription className="text-xs">
                                                                {v.timestamp.toLocaleString('en', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                })}
                                                            </TimelineContentDescription>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </div>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
