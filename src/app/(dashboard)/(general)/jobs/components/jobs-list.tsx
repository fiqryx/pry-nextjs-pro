'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { Jobs } from "@/types/jobs"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"

interface JobslistProps extends
    React.HtmlHTMLAttributes<HTMLDivElement> {
    jobs: Jobs[]
}

export function JobsList({
    jobs,
    className,
    ...props
}: JobslistProps) {
    return (
        <div
            {...props}
            className={cn('grid rounded-xl border', className)}
        >
            {jobs.map((job, idx) => (
                <div
                    key={idx}
                    className={cn(
                        'flex justify-between items-center p-4 gap-2',
                        idx < jobs.length - 1 && 'border-b'
                    )}
                >
                    <div className="grid gap-1">
                        <span
                            title={job.title}
                            className="text-sm font-semibold tracking-tight"
                        >
                            {job.title}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                            {job.category} • {`$${job.budgetMin} - $${job.budgetMax}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground tracking-tight">
                            {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                        </span>
                        <Button size="sm" variant="ghost-primary">
                            Apply
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}