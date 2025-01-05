'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"

import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AvatarWithContent } from "@/components/ui/avatar"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

export function CompanySpecifications({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('w-full', className)}>
            <Card>
                <CardContent className="grid p-4 gap-4">
                    <h3 className="text-sm font-semibold tracking-tight">
                        About
                    </h3>
                    <div className="grid px-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground tracking-tight">
                                Website
                            </span>
                            <span className="text-sm text-primary hover:underline">
                                {company.site ?? '-'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">
                                Industry
                            </span>
                            <span className="text-sm tracking-tight capitalize">
                                {company.industry ?? '-'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">
                                Locations
                            </span>
                            <span className="text-sm tracking-tight capitalize">
                                {company.city}, {company.country}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-muted-foreground">
                                Company size
                            </span>
                            <span className="text-sm tracking-tight capitalize">
                                {company.size ?? '-'}
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <h3 className="text-sm font-semibold tracking-tight">
                        Founders
                    </h3>
                    <ScrollArea className="h-[320px]">
                        <div className="grid px-2 gap-4">
                            {company.members.slice(0, 6).map((member, idx) => (
                                <AvatarWithContent key={idx} src={member.photo}>
                                    <div className="flex flex-col text-warp gap-1">
                                        <h3 className="text-sm">{member.name}</h3>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {member.jobTitle}
                                        </span>
                                    </div>
                                </AvatarWithContent>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
