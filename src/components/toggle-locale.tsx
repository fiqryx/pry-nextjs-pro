'use client'
import React from "react"
import languages from '@/../locales/languages.json'

import { Globe } from "lucide-react"
import { useAppStore } from "@/stores/app"
import { setCookie } from 'cookies-next/client'
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "react-i18next"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function ToogleLocale({
    locale,
    ...props
}: React.ComponentProps<typeof Select> & {
    locale?: string
}) {
    const appStore = useAppStore();
    const { toast } = useToast()
    const { t, i18n } = useTranslation();

    const onChange = (value: string) => {
        if (value !== locale) {
            appStore.set({ locale: value })
            i18n.changeLanguage(value)
            setCookie('LOCALE', value, { path: '/' })

            toast({ description: t('languageChanged') })
        }
    }

    return (
        <Select
            {...props}
            onValueChange={onChange}
            defaultValue={locale ?? appStore.locale}
        >
            <SelectTrigger className="hidden sm:flex items-center justify-between h-8">
                <Globe className='w-4 h-4 mr-2 text-muted-foreground' />
                <SelectValue placeholder={t('Language')} />
            </SelectTrigger>
            <SelectContent>
                {languages.map((item, idx) => (
                    <SelectItem key={idx} value={item.code}>
                        {item.code.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}