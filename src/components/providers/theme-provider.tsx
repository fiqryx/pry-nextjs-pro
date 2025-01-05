"use client"

import React from "react"
import { ThemeProvider as NextThemeProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemeProvider>) {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
