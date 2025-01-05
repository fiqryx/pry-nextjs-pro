'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"
import { CompanyMembers } from "./company-members"

export function CompanyTeams({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('grid mt-4 gap-4', className)}>
            <span className="font-semibold tracking-tight">
                Team ({company.members.length})
            </span>
            <CompanyMembers members={company.members} />
        </div>
    )
}