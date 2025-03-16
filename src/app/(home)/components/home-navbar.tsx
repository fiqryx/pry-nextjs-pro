"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "./home-toogle-theme";

import {
    LucideIcon,
    BookOpenIcon,
    ComponentIcon,
} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navMenu = [
    {
        title: "Alert Dialog",
        href: "https://ui.shadcn.com/docs/components/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "https://ui.shadcn.com/docs/components/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "https://ui.shadcn.com/docs/components/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "https://ui.shadcn.com/docs/components/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "https://ui.shadcn.com/docs/components/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "https://ui.shadcn.com/docs/components/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

const navMobile = [
    {
        icon: BookOpenIcon,
        title: 'Documentation',
        href: process.env.NEXT_PUBLIC_SITE_DOCS_URL
    },
    {
        icon: ComponentIcon,
        title: 'Components',
        href: 'https://ui.shadcn.com/docs/components'
    },
]

export function Navbar({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                "fixed left-1/2 inset-x-0 max-w-7xl mx-auto z-40",
                className
            )}
        >
            <NavigationMenu className="flex lg:rounded-2xl border border-input bg-background shadow-sm gap-6 px-2 h-14 lg:h-12 max-w-full">
                <Link href={"/"} className="inline-flex items-center gap-1.5 font-semibold ml-2 lg:ml-3.5">
                    <Icons.logo className="size-5 bg-foreground text-background p-0.5 rounded-sm" />
                    <span className="font-medium text-[15px]">{site.name}</span>
                </Link>
                <NavigationMenuList className="flex items-center gap-1.5 max-sm:hidden">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {navMenu.map((item, idx) => (
                                    <ListItem key={idx} target="_blank" {...item}>
                                        {item.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={process.env.NEXT_PUBLIC_SITE_DOCS_URL ?? '#'} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <div className="flex flex-1 justify-end items-center gap-1.5">
                    <ThemeToggle className="hidden sm:flex" />
                    <Link
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_REPO_URL ?? "#"}
                        className="hidden sm:flex size-8 hover:bg-accent hover:text-accent-foreground p-1.5 rounded-lg"
                    >
                        <Icons.gitHub />
                    </Link>
                    <NavigationMenuItem className="list-none sm:hidden">
                        <NavigationMenuTrigger className="px-3.5" />
                        <NavigationMenuContent className="flex flex-col gap-3 p-4">
                            <ul className="grid gap-3">
                                {navMobile.map((item, idx) => <ListItem key={idx} {...item} />)}
                            </ul>
                            <div className="flex flex-row items-center gap-1.5">
                                <Link
                                    target="_blank"
                                    href={process.env.NEXT_PUBLIC_REPO_URL ?? "#"}
                                    className="flex lg:hidden size-8 hover:bg-accent hover:text-accent-foreground p-1.5 rounded-lg"
                                >
                                    <Icons.gitHub />
                                </Link>
                                <div role="separator" className="flex-1" />
                                <ThemeToggle className="flex lg:hidden" />
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </div>
            </NavigationMenu>
        </div>
    );
}

interface ListItemProps extends
    Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> {
    href?: string
    icon?: LucideIcon
}

const ListItem = React.forwardRef<
    HTMLAnchorElement,
    ListItemProps
>(({ className, icon, href, title, children, ...props }, ref) => {
    const Comp = icon;

    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href ?? '#'}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-1 sm:p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="inline-flex items-center text-sm font-medium leading-none gap-2">
                        {Comp && <Comp className="size-5" />}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
