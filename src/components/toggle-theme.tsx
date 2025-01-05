"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { CheckIcon, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function ToggleTheme({
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    const { theme, themes, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn("h-7 w-7 p-2", className)}
                    {...props}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map((value, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        className="justify-between capitalize"
                        onClick={() => setTheme(value)}
                    >
                        {value}
                        <CheckIcon
                            className={cn(
                                "h-4 w-4",
                                theme === value ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
