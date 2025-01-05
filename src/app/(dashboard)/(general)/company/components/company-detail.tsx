'use client'
import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"

import { AvatarWithContent } from "@/components/ui/avatar"
import { CompanyOverview } from "./company-overview"
import { CompanyReviews } from "./company-reviews"
import { CompanyActivity } from "./company-activity"
import { CompanyTeams } from "./company-teams"
import { CompanyAssets } from "./company-assets"

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

type Tabs = '/' | '/reviews' | '/activity' | '/team' | '/assets'

type TabMap = {
    label: string
    path: Tabs
    component?: React.ElementType
}

const tabsMap: TabMap[] = [
    { path: '/', label: 'Overview', component: CompanyOverview },
    { path: '/reviews', label: 'Reviews', component: CompanyReviews },
    { path: '/activity', label: 'Activity', component: CompanyActivity },
    { path: '/team', label: 'Team', component: CompanyTeams },
    { path: '/assets', label: 'Assets', component: CompanyAssets },
]

interface CompanyDetailProps extends
    React.HtmlHTMLAttributes<HTMLDivElement> {
    tab: Tabs
}

export function CompanyDetail({
    tab,
    className,
    ...props
}: CompanyDetailProps) {
    const [company] = useCompany()

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('', className)}>
            <Card>
                <CardHeader className="flex flex-row flex-wrap items-center gap-4">
                    <AvatarWithContent src={company.logo} />
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>{company.name}</CardTitle>
                        <CardDescription className="line-clamp-1">
                            {company.slogan}
                        </CardDescription>
                    </div>
                </CardHeader>
                <Tabs defaultValue={tab}>
                    <TabsList className="w-full justify-start items-start bg-background rounded-none border-y">
                        {tabsMap.map((tab, idx) => (
                            <TabsTrigger
                                asChild
                                key={idx}
                                value={tab.path}
                            >
                                <Link
                                    href={`/company/${company.id}${tab.path}`}
                                    className="capitalize data-[state=active]:text-primary data-[state=active]:shadow-none"
                                >
                                    {tab.label}
                                </Link>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <CardContent className="grid">
                        {tabsMap.map((tab, idx) => (
                            <TabsContent key={idx} value={tab.path} >
                                {tab.component && <tab.component />}
                            </TabsContent>
                        ))}
                    </CardContent>
                </Tabs>
            </Card>
        </div>
    )
}
