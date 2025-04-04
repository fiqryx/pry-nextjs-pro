"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { colors } from "@/config/colors"

import { useAppStore } from "@/stores/app"
import { usePathname } from "next/navigation"
import { SettingSheet } from "../settings-sheet"
import { Loading } from "@/components/ui/loading"

export function AppProvider({ children }: React.PropsWithChildren) {
    const pathname = usePathname()
    const appStore = useAppStore()

    React.useEffect(() => {
        if (!appStore.initialize) {
            appStore.init()
        }
    }, [pathname])

    React.useEffect(() => {
        const root = window.document.body;

        for (const value in colors) {
            const matcher = value + '-';
            const color = appStore.color[value as keyof typeof colors]
            const current = Array.from(root.classList).find((className) =>
                className.startsWith(matcher)
            )

            if (current) {
                root.classList.remove(current);
            }

            if (color && color !== 'default') {
                root.classList.add(`${matcher}${color}`);
            }
        }
    }, [appStore.color])

    if (appStore.loading) {
        return (
            <Loading
                variant={cn({
                    'spinner': appStore.loading_message
                }) as 'dots'}
            >
                <span className="text-xs text-muted-foreground">
                    {appStore.loading_message}
                </span>
            </Loading>
        )
    }

    return (
        <>
            {children}
            {!appStore.loading && (
                <SettingSheet className="fixed z-10 flex bottom-5 right-5 lg:bottom-8 lg:right-10 animate-spin animate-duration-[5000ms]" />
            )}
        </>
    )
}