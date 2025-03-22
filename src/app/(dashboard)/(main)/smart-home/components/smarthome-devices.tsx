"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useDevices } from "../use-devices"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

import {
    ChevronDown,
    ChevronRight,
    LucideIcon
} from "lucide-react"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function SmartHomeDevices({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [devices, setDevices] = useDevices()
    const [filter, setFilter] = React.useState("on")

    return (
        <div {...props} className={cn('grid gap-2', className)}>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="font-semibold tracking-tight">
                    My Devices
                </h1>
                <div className="flex flex-wrap items-center gap-3.5">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="uppercase">
                                {filter}
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit mr-4">
                            <DropdownMenuRadioGroup
                                value={filter}
                                onValueChange={setFilter}
                            >
                                <DropdownMenuRadioItem value="on">
                                    ON
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="off">
                                    OFF
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="icon" variant="outline" className="h-8">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <ScrollArea className="max-w-prose md:max-w-(--breakpoint-md) whitespace-nowrap">
                <div className="flex w-max space-x-5 px-2 py-4">
                    {devices.map((item) => (
                        <CardDevices
                            {...item}
                            key={item.id}
                            className='text-primary-foreground bg-chart-2 w-56'
                            onPress={() => {
                                setDevices(prev => prev.map((device) =>
                                    device.id !== item.id ? device : {
                                        ...device,
                                        active: !device.active
                                    }
                                ))
                            }}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

type CardDevicesProps = {
    id?: string | number
    active?: boolean
    icon: LucideIcon
    label: string
    onPress?: () => void
}

const CardMotion = motion(Card)

function CardDevices({
    id,
    className,
    active,
    icon: Icon,
    label,
    onPress,
    ...props
}: Omit<React.ComponentProps<typeof CardMotion>, 'id'> & CardDevicesProps) {
    return (
        <CardMotion
            {...props}
            id={id?.toString()}
            onClick={onPress}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={cn('cursor-pointer', className)}
        >
            <CardContent className="flex flex-col py-6 px-4 gap-4">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <Icon className="size-12" />
                    <span className="text-xs font-semibold inline-flex items-center gap-2">
                        {active ? 'ON' : 'OFF'}
                        <Switch
                            checked={active}
                            onChange={onPress}
                            classNameThumb="bg-white"
                            className='data-[state=checked]:bg-primary-foreground/50'
                        />
                    </span>
                </div>
                <span className="text-sm font-semibold">
                    {label}
                </span>
            </CardContent>
        </CardMotion>
    )
}