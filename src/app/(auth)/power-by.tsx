import React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const data = [
    {
        src: '/assets/logo-supabase.svg',
        url: 'https://supabase.com/',
        content: 'Authenticating with Supabase'
    }
]

export function PowerBy({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div {...props} className={cn('flex flex-wrap gap-4', className)}>
            <TooltipProvider>
                {data.map((item, idx) => (
                    <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                            <Link href={item.url} target="_blank" className="relative size-7">
                                <Image fill alt="power-by" src={item.src} className="object-contain" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-foreground text-background px-2 py-1">
                            <span>{item.content}</span>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    )
}
