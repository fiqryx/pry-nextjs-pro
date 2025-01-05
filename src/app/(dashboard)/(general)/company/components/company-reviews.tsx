'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"
import { formatDistanceToNow } from "date-fns"

import { Icons } from "@/components/icons"
import { AvatarWithContent } from "@/components/ui/avatar"


export function CompanyReviews({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()

    if (!company) {
        return null
    }

    const overallReviews = React.useMemo(() => {
        if (!company.reviews.length) return 0;
        const total = company.reviews.reduce((sum, review) => sum + review.rate, 0);
        return parseFloat((total / company.reviews.length).toFixed(1));
    }, [company])

    return (
        <div {...props} className={cn('grid mt-4 gap-4', className)}>
            <h3 className="font-semibold tracking-tight">
                Reviews
            </h3>
            <div className="flex flex-wrap items-center rounded-xl border p-4 gap-4">
                <span className="text-sm font-semibold tracking-tight">
                    Overall reviews
                </span>
                <div className="flex items-center flex-wrap gap-1">
                    <Icons.starRating
                        className="fill-warning stroke-muted size-4"
                        width={Math.min((overallReviews / 5) * 100, 100)}
                    />
                    <span className="text-sm text-muted-foreground">
                        {overallReviews}/5
                    </span>
                </div>
                <span>•</span>
                <span className="text-xs text-muted-foreground">
                    {company.reviews.length} reviews in total
                </span>
            </div>
            {company.reviews.map((item, idx) => (
                <div key={idx} className="grid rounded-xl border p-4 gap-4">
                    <AvatarWithContent src={item.photo}>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold tracking-tight capitalize truncate">
                                {item.title}
                            </h3>
                            <div className="flex items-center flex-wrap gap-4">
                                <div className="flex items-center flex-wrap gap-1">
                                    <Icons.starRating
                                        className="fill-warning stroke-muted size-4"
                                        width={Math.min((item.rate / 5) * 100, 100)}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        {item.rate}/5
                                    </span>
                                </div>
                                <span>•</span>
                                <span className="text-xs tracking-tight">
                                    {item.user}
                                </span>
                                <span>•</span>
                                <span className="text-xs text-muted-foreground tracking-tight">
                                    {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    </AvatarWithContent>
                    <p className="text-sm">{item.review}</p>
                </div>
            ))}
        </div>
    )
}