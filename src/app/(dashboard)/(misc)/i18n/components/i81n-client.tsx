'use client'
import React from "react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function I18nClient({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { t } = useTranslation()

    return (
        <div {...props} className={cn('flex flex-col gap-4', className)}>
            <div className="flex items-center w-full border border-dashed p-4">
                <span>
                    {t('translationExample')}
                </span>
            </div>
        </div>
    )
}