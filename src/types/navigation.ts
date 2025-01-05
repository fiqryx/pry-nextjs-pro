import { BadgeProps } from "@/components/ui/badge"

export type Navigation = Record<string, (NavTeam | NavMain)[]>

export type NavLabel = string | Pick<BadgeProps, 'variant' | 'children'>

export interface NavTeam {
    name: string
    logo: React.ElementType
    plan: string
}

export interface NavMain {
    title: string
    url?: string
    target?: React.HTMLAttributeAnchorTarget
    icon?: string | React.ElementType
    isOpen?: boolean
    label?: NavLabel
    items?: NavMain[]
}