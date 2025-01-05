"use client"

import React from "react"
import { cn } from "@/lib/utils"
import * as Lucide from "lucide-react"
import { useAuthStore } from "@/stores/auth"
import { useRooms } from "../use-rooms"
import { useWidgets } from "../use-widgets"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function SmartHomeWidgets({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { user } = useAuthStore()
    const [room, setRoom] = useRooms()
    const [widgets, setWidgets] = useWidgets()
    const [openRoom, setOpenRoom] = React.useState(false)

    return (
        <div {...props} className={cn('grid gap-5', className)}>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold">
                    {user?.firstName ?? 'Unknown'} Home
                </h1>
                <div className="flex flex-wrap items-center gap-3.5">
                    <span className="text-md inline-flex items-center gap-1">
                        <Lucide.Droplets className="size-5 text-muted-foreground" />
                        35%
                    </span>
                    <span className="text-md inline-flex items-center gap-1">
                        <Lucide.Thermometer className="size-5 text-muted-foreground" />
                        15&deg;C
                    </span>
                    <Popover open={openRoom} onOpenChange={setOpenRoom}>
                        <PopoverTrigger asChild>
                            <Button
                                role="combobox"
                                variant="outline"
                                aria-expanded={openRoom}
                                className="w-[160px] justify-between"
                            >
                                {room.selected
                                    ? room.list.find((item) => item.value === room.selected)?.label
                                    : "Select room..."}
                                <Lucide.ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search room..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No room found.</CommandEmpty>
                                    <CommandGroup>
                                        {room.list.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(current) => {
                                                    setRoom({
                                                        ...room,
                                                        selected: current === room.selected ? "" : current
                                                    })
                                                    setOpenRoom(false)
                                                }}
                                            >
                                                {item.label}
                                                <Lucide.Check
                                                    className={cn(
                                                        "ml-auto",
                                                        room.selected === item.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                {widgets.map((item) => (
                    <CardWidget
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        active={item.active}
                        onPress={() => {
                            setWidgets(prev => prev.map((value) =>
                                value.id !== item.id ? value : {
                                    ...value,
                                    active: !value.active
                                }
                            ))
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

type CardWidgetProps = {
    active?: boolean
    icon: Lucide.LucideIcon
    label: string
    onPress?: () => void
}

const CardMotion = motion(Card)

function CardWidget({
    className,
    active,
    icon: Icon,
    label,
    onPress,
    ...props
}: React.ComponentProps<typeof CardMotion> & CardWidgetProps) {
    const [isHover, setIsHover] = React.useState(false)

    return (
        <CardMotion
            {...props}
            onClick={onPress}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            className={cn(
                'cursor-pointer transition-colors duration-300',
                isHover && 'bg-primary',
                className
            )}
        >
            <CardContent className="flex flex-col p-4 gap-4">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <span
                        className={cn(
                            'text-xs font-semibold',
                            isHover && 'text-primary-foreground'
                        )}
                    >
                        {active ? 'ON' : 'OFF'}
                    </span>
                    <Switch
                        checked={active}
                        onChange={onPress}
                        classNameThumb="bg-white"
                        className={cn(
                            isHover && 'data-[state=checked]:bg-primary-foreground/50'
                        )}
                    />
                </div>
                <Icon
                    className={cn(
                        'size-12',
                        isHover && 'text-primary-foreground',
                        !isHover && 'text-primary'
                    )}
                />
                <span
                    className={cn(
                        'text-sm font-semibold',
                        isHover && 'text-primary-foreground',
                        !isHover && 'text-primary'
                    )}
                >
                    {label}
                </span>
            </CardContent>
        </CardMotion>
    )
}