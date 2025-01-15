"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { getNotifications } from "@/lib/fakers/notification-faker"

import { ScrollArea } from "./ui/scroll-area"
import { Button } from "@/components/ui/button"
import { BellIcon, ArrowRight } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"


export function ToggleNotification({
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const notification = getNotifications(10)

    return (
        <DropdownMenu>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <div className="block">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={cn("h-7 w-7 p-2 focus:ring-0", className)}
                                    {...props}
                                >
                                    <BellIcon />
                                </Button>
                            </div>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        Notification
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent
                side="bottom"
                align="end"
                sideOffset={4}
                className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
            >
                <ScrollArea className="h-96">
                    {notification.sort((a, b) => b.date.getTime() - a.date.getTime()).map((item, index) => (
                        <DropdownMenuItem key={index} className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="size-10">
                                    <AvatarImage src={item.avatar} alt={item.name} />
                                    <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{item.message}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {item.date.toLocaleString('en', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-xs text-muted-foreground">
                    <ArrowRight />
                    See all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}