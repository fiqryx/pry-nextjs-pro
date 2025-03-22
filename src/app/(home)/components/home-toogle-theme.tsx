"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cva } from "class-variance-authority";


const buttonVariants = cva(
    'size-7 rounded-full p-1.5 text-muted-foreground cursor-pointer',
    {
        variants: {
            dark: {
                true: 'dark:bg-accent dark:text-accent-foreground',
                false: 'bg-accent text-accent-foreground dark:bg-transparent dark:text-muted-foreground',
            },
        },
    },
);

export function ThemeToggle({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { setTheme, resolvedTheme } = useTheme();

    const onToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            {...props}
            type="button"
            className={cn(
                'inline-flex items-center rounded-full border p-[3px]',
                className,
            )}
            onClick={onToggle}
        >
            <Sun className={buttonVariants({ dark: false })} />
            <Moon className={buttonVariants({ dark: true })} />
        </button>
    );
}