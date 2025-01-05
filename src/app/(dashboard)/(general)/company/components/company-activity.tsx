'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"
import { useTranslation } from "react-i18next"
import { AvatarWithContent } from "@/components/ui/avatar"

import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineContentDescription,
    TimelineContentLabel,
    TimelineDot,
    TimelineItem
} from "@/components/ui/timeline"


export function CompanyActivity({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { i18n } = useTranslation()
    const [company] = useCompany()

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('grid mt-4 gap-4', className)}>
            <h3 className="font-semibold tracking-tight">
                Activity
            </h3>
            <Timeline size="lg" variant="outline" className="mt-2">
                {company.activities.map((item, idx) => (
                    <TimelineItem key={idx}>
                        <TimelineConnector hideLine={idx === company.activities.length - 1}>
                            <TimelineDot>
                                <AvatarWithContent src={item.member.photo} className="size-10" />
                            </TimelineDot>
                        </TimelineConnector>
                        <TimelineContent>
                            <TimelineContentLabel className="text-sm font-medium">
                                {item.activity}
                            </TimelineContentLabel>
                            <TimelineContentDescription className="text-xs">
                                {item.createdAt.toLocaleString(i18n.language, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </TimelineContentDescription>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    )
}