"use client"

import React from "react"
import { cn, ctv } from "@/lib/utils"
import { useTheme } from "next-themes"
import { colors } from "@/config/colors"
import { useAppStore } from "@/stores/app"
import { Button } from "@/components/ui/button"

import {
    XIcon,
    RotateCcwIcon,
    SettingsIcon,
    CheckIcon,
    SunIcon,
    MoonIcon,
    MonitorSmartphoneIcon,
    InfoIcon,
} from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const themes = [
    { name: 'light', icon: SunIcon },
    { name: 'dark', icon: MoonIcon },
    { name: 'system', icon: MonitorSmartphoneIcon },
]

export function SettingSheet({
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const { color, set } = useAppStore()
    const { theme, setTheme } = useTheme()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className={cn("size-10 rounded-full", className)}
                    {...props}
                >
                    <SettingsIcon />
                </Button>
            </SheetTrigger>
            <SheetContent hideClose>
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-10 top-2"
                    onClick={() => {
                        setTheme('system')
                        set({ color: { primary: 'blue', sidebar: 'default' } })
                    }}
                >
                    <RotateCcwIcon className="h-4 w-4" />
                </Button>
                <SheetClose asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2"
                    >
                        <XIcon className="h-4 w-4" />
                    </Button>
                </SheetClose>
                <SheetHeader>
                    <SheetTitle className="text-md">App Settings</SheetTitle>
                </SheetHeader>
                <div className="grid gap-8 py-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            Primary color
                        </span>
                        <div className="flex flex-wrap gap-3.5">
                            {colors.primary.map((item, idx) => (
                                <Button
                                    key={idx}
                                    size="sm"
                                    variant="outline"
                                    className="rounded-full p-2"
                                    onClick={() => set({ color: { primary: item.color } })}
                                >
                                    <span
                                        style={{
                                            backgroundColor: `hsl(${ctv(`.primary-${item.color}`)})`
                                        }}
                                        className={cn(
                                            'rounded-full',
                                            color.primary === item.color ? 'p-1' : 'p-3'
                                        )}
                                    >
                                        {color.primary === item.color && (
                                            <CheckIcon className="text-primary-foreground" />
                                        )}
                                    </span>
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold">
                            Color scheme
                        </span>
                        <div className="flex flex-wrap gap-3.5">
                            {themes.map((item, idx) => (
                                <Button
                                    key={idx}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setTheme(item.name)}
                                    className={cn(
                                        'capitalize rounded-full',
                                        theme === item.name && 'border-2 border-primary'
                                    )}
                                >
                                    <item.icon />
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="flex text-sm font-semibold gap-2">
                            Sidebar color
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <InfoIcon className="size-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent className="text-xs p-1">
                                        Dashboard only
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </span>
                        <div className="flex flex-wrap gap-3.5">
                            {colors.sidebar.map((item, idx) => (
                                <Button
                                    key={idx}
                                    size="sm"
                                    variant="outline"
                                    className={cn(
                                        'capitalize rounded-full',
                                        color.sidebar === item.color && 'border-2 border-primary'
                                    )}
                                    onClick={() => set({ color: { sidebar: item.color } })}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
