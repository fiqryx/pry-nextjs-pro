'use client'
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"

import { Button } from "@/components/ui/button"
import { StarFilledIcon } from "@radix-ui/react-icons"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import {
    Users2,
    ImageIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { JobsList } from "./jobs-list"


export function JobsCompany({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()
    const [page, setPage] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <div {...props} className={cn('grid gap-6', className)}>
            {company.slice(
                page.pageIndex * page.pageSize,
                (page.pageIndex + 1) * page.pageSize
            ).map((item, idx) => (
                <Card key={idx}>
                    <CardContent className="grid p-2 lg:p-4 gap-4">
                        <div className="flex gap-2 px-1 py-1.5">
                            <Avatar className="text-sm border size-16 ">
                                <AvatarImage src={item.logo} alt={item.name} />
                                <AvatarFallback>
                                    <ImageIcon className="text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid">
                                <Link
                                    title={item.name}
                                    href={`/company/${item.id}`}
                                    className="truncate font-semibold hover:underline"
                                >
                                    {item.name}
                                </Link>
                                <span
                                    title={item.slogan}
                                    className="truncate text-sm text-muted-foreground"
                                >
                                    {item.slogan}
                                </span>
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Users2 className="size-4" />
                                        <span className="text-xs text-muted-foreground tracking-tight">
                                            {item.size}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <StarFilledIcon className="text-warning size-4" />
                                        <span className="text-xs text-muted-foreground">
                                            {item.rate}/5
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <JobsList jobs={item.jobs} />
                    </CardContent>
                </Card>
            ))}
            <div className="flex justify-center items-center gap-4">
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={page.pageIndex === 0}
                    onClick={() =>
                        setPage({ ...page, pageIndex: page.pageIndex - 1 })
                    }
                >
                    <ChevronLeft />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    disabled={
                        page.pageIndex >= Math.ceil(company.length / page.pageSize) - 1
                    }
                    onClick={() =>
                        setPage({ ...page, pageIndex: page.pageIndex + 1 })
                    }
                >
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}