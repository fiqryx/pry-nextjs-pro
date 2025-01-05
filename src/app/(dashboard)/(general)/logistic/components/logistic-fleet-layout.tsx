'use client'
import React from "react"
import { cn } from '@/lib/utils'

import { Button } from "@/components/ui/button";
import { Ellipsis, MenuIcon } from "lucide-react";
import { LogisticFleetSidebar } from "./logistic-fleet-sidebar";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";

export function LogisticFleetLayout({
    className,
    children,
    ...props
}: React.ComponentProps<typeof SidebarProvider>) {
    return (
        <SidebarProvider {...props} className="min-h-full sidebar-default">
            <LogisticFleetSidebar className="sidebar-default border inset-y-auto ltr:left-auto rtl:right-auto h-full" />
            <SidebarInset className="min-h-full">
                <header className="flex h-12 shrink-0 justify-between items-center gap-2 bg-background border transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 px-4">
                    <div className="flex lg:hidden items-center gap-2">
                        <SidebarTrigger>
                            <MenuIcon />
                        </SidebarTrigger>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                            <Ellipsis />
                        </Button>
                    </div>
                </header>
                <div className={cn('flex-1 gap-4', className)}>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}