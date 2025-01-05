"use client"

import React from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import {
    ChevronRight,
    ImageIcon
} from "lucide-react"
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

const members = [
    {
        name: 'Scarlet',
        permission: 'admin',
        image: '/assets/avatar-2.jpg'
    },
    {
        name: 'Nariya',
        permission: 'full access',
        image: '/assets/avatar-3.jpg'
    },
    {
        name: 'Maya',
        permission: 'full access',
        image: '/assets/avatar-1.jpg'
    },
    {
        name: 'Dad',
        permission: 'full access',
        image: '/assets/avatar-8.jpg'
    },
    {
        name: 'Mom',
        permission: 'full access',
        image: '/assets/avatar-4.jpg'
    },
    {
        name: 'Boy',
        permission: 'full access',
        image: '/assets/avatar-7.jpg'
    },
]

export function SmartHomeMembers({
    className,
    ...props
}: React.ComponentProps<'div'>) {

    return (
        <div {...props} className={cn('grid gap-4', className)}>
            <div className="flex flex-wrap justify-between items-center gap-2">
                <h1 className="font-semibold tracking-tight">
                    Members
                </h1>
                <Button size="icon" variant="outline" className="h-8">
                    <ChevronRight />
                </Button>
            </div>
            <ScrollArea className="max-w-prose md:max-w-screen-md whitespace-nowrap rounded-lg border shadow">
                <div className="flex w-max space-x-10 p-4">
                    {members.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            <Avatar className="size-12 text-sm">
                                <AvatarImage src={item.image} alt={item.name} />
                                <AvatarFallback>
                                    <ImageIcon className="text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-semibold mt-2">{item.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">
                                {item.permission}
                            </span>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}