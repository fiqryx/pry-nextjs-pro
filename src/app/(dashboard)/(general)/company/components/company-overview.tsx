'use client'
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"

import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { JobsList } from "../../jobs/components/jobs-list"
import { CompanyMembers } from "./company-members"


export function CompanyOverview({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('grid mt-4 gap-4', className)}>
            <article className="space-y-2">
                <h3 className="text-lg tracking-tight">
                    Stripe is a technology company that builds economic infrastructure for the internet.
                </h3>
                {company.about?.split('|').map((text, idx) => (
                    <p
                        key={idx}
                        className={cn(
                            'text-sm',
                            idx === 0 && 'indent-4'
                        )}
                    >
                        {text}
                    </p>
                ))}
            </article>
            <Separator />
            <div className="grid gap-2">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <span className="font-semibold tracking-tight">
                        Jobs
                    </span>
                    <Link href="#" className={buttonVariants({ variant: 'link' })}>
                        Jobs
                        <ChevronRight />
                    </Link>
                </div>
                <JobsList jobs={company.jobs} />
            </div>
            <Separator />
            <div className="grid gap-2">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <span className="font-semibold tracking-tight">
                        Members
                    </span>
                    <Link href="#" className={buttonVariants({ variant: 'link' })}>
                        Members
                        <ChevronRight />
                    </Link>
                </div>
                <CompanyMembers members={company.members.slice(0, 2)} />
            </div>
        </div>
    )
}