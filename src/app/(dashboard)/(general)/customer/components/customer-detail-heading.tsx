'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { useCustomer } from "../use-customer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    ClockIcon,
    CircleMinus,
    ChevronDown,
    CircleCheckBig,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const statusIcon = {
    active: CircleCheckBig,
    pending: ClockIcon,
    blocked: CircleMinus
}

export function CustomerDetailHeading({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [customer] = useCustomer()

    if (!customer) {
        return null
    }

    const Icon = statusIcon[customer.status]

    return (
        <div
            {...props}
            className={cn(
                'flex flex-col sm:flex-row w-full justify-between gap-5',
                className
            )}
        >
            <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                <Avatar className="h-20 w-20 rounded-full">
                    <AvatarImage src={customer.image} alt={customer.name} />
                    <AvatarFallback className="rounded-full">
                        {customer.name.slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <h3 className="text-3xl font-bold tracking-tight">
                            {customer.name}
                        </h3>
                        <Badge variant="outline" className="rounded-full capitalize text-xs font-normal h-6 p-1 gap-1">
                            <Icon
                                className={cn(
                                    'w-4 h-4',
                                    customer.status === 'active' && 'text-success',
                                    customer.status === 'pending' && 'text-warning',
                                    customer.status === 'blocked' && 'text-destructive',
                                )}
                            />
                            {customer.status}
                        </Badge>
                    </div>
                    <span className="truncate text-muted-foreground">
                        {customer.email}
                    </span>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        Action
                        <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        Action
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            New Team
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}