'use client'
import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCompany } from "../use-company"

import { Button } from "@/components/ui/button"
import { EllipsisIcon, FileIcon } from "lucide-react"

export function CompanyAssets({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [company] = useCompany()
    const [coverSrc, setCoverSrc] = React.useState('/assets/banner-1.png')

    if (!company) {
        return null
    }

    return (
        <div {...props} className={cn('grid mt-4 gap-4', className)}>
            <h3 className="font-semibold tracking-tight">
                Assets (2)
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="grid rounded-xl border">
                    <div className="flex justify-center items-center rounded-t-xl bg-muted h-36 relative">
                        <Image
                            alt="cover"
                            src={coverSrc}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-xl"
                            onError={() =>
                                setCoverSrc("/assets/image-placeholder-1.png")
                            }
                        />
                    </div>
                    <div className="flex justify-between items-center p-4 pr-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs max-w-40 truncate">Cover.png</span>
                            <span className="text-xs text-muted-foreground">96 KB</span>
                        </div>
                        <Button size="icon" variant="ghost">
                            <EllipsisIcon />
                        </Button>
                    </div>
                    <Button variant="ghost" className="flex justify-center items-center rounded-t-none border-t p-3">
                        <span className="text-xs text-muted-foreground">Download</span>
                    </Button>
                </div>

                <div className="grid rounded-xl border">
                    <div className="flex justify-center items-center rounded-t-xl bg-muted h-36">
                        <FileIcon className="text-muted-foreground size-6" />
                    </div>
                    <div className="flex justify-between items-center p-4 pr-2 gap-2">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs max-w-40 truncate">Presentation.pdf</span>
                            <span className="text-xs text-muted-foreground">1.2 MB</span>
                        </div>
                        <Button size="icon" variant="ghost">
                            <EllipsisIcon />
                        </Button>
                    </div>
                    <Button variant="ghost" className="flex justify-center items-center rounded-t-none border-t p-3">
                        <span className="text-xs text-muted-foreground">Download</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}