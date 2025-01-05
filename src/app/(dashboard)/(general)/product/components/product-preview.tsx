'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useProduct } from "../use-product"

import { ImageIcon } from "lucide-react"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"

export function ProductPreview({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [product] = useProduct()

    if (!product) {
        return null
    }

    const image = product.images?.[0]

    return (
        <div {...props} className={cn('w-full', className)}>
            <Card>
                <CardContent className="flex flex-col py-6 gap-5">
                    <Avatar className="size-24 text-sm rounded-lg">
                        <AvatarImage src={image?.src} alt={image?.filename} />
                        <AvatarFallback className="rounded-lg">
                            <ImageIcon className="text-muted-foreground size-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-tight max-w-xs">
                        <span className="truncate">
                            {product.name}
                        </span>
                        <span className="truncate text-sm text-muted-foreground">
                            {product.category}
                        </span>
                    </div>
                    <p className="truncate text-sm leading-tight">
                        ${product.price}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}