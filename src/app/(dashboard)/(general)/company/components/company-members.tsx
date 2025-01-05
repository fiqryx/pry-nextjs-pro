'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { Member } from "@/types/company"

import { Badge } from "@/components/ui/badge"
import { AvatarWithContent } from "@/components/ui/avatar"

interface CompanyMemberProps extends
    React.HtmlHTMLAttributes<HTMLDivElement> {
    members: Member[]
}

export function CompanyMembers({
    members,
    className,
    ...props
}: CompanyMemberProps) {
    return (
        <div {...props} className={cn('grid sm:grid-cols-2 gap-4', className)}>
            {members.map((member, idx) => (
                <div key={idx} className="grid rounded-xl border p-6 gap-4">
                    <AvatarWithContent src={member.photo}>
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-sm">{member.name}</h3>
                            <span className="text-xs text-muted-foreground truncate">
                                {member.jobTitle}
                            </span>
                        </div>
                    </AvatarWithContent>
                    <div className="flex flex-wrap items-center gap-2">
                        {member.skills.map((skill, idx) => (
                            <Badge
                                key={idx}
                                variant="secondary"
                                className="w-fit text-xs font-normal capitalize rounded-full py-1 px-2 gap-2"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}