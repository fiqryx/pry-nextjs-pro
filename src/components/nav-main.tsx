"use client"
import React from "react"
import Link from "next/link"
import { useAppStore } from "@/stores/app"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { NavLabel, NavMain } from "@/types/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

export function NavMain({
  label,
  items = [],
}: {
  label?: string
  items?: NavMain[]
}) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="capitalize">
          {label}
        </SidebarGroupLabel>
      )}
      <NavItem items={items} />
    </SidebarGroup >
  )
}

export function NavItem({
  items,
  isNested = false
}: {
  items: NavMain[]
  isNested?: boolean
}) {
  const pathname = usePathname();
  const appStore = useAppStore();

  const toggleItem = (title: string) => {
    const updatedState = {
      ...appStore.navigation_open,
      [title]: !appStore.navigation_open[title],
    };
    appStore.set({ navigation_open: updatedState })
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <NavItemContent
          key={item.title}
          item={item}
          isNested={isNested}
          pathname={pathname}
          appStore={appStore}
          toggleItem={toggleItem}
        />
      ))}
    </SidebarMenu>
  )
}


interface NavItemContentProps<T> {
  item: NavMain
  isNested: boolean
  pathname: string
  appStore: T
  toggleItem: (title: string) => void
}

function NavItemContent<T extends Record<string, any>>({
  item,
  isNested,
  pathname,
  appStore,
  toggleItem,
}: NavItemContentProps<T>) {
  const isCollapsed = item.items?.some((subItem) => subItem.url === pathname)
  const isOpen = isCollapsed || (appStore.navigation_open[item.title] ?? item.isOpen)
  const isActive = (!item.items?.length || !appStore.sidebar_open) && item.url === pathname

  return (
    <Collapsible key={item.title} asChild defaultOpen={isOpen}>
      <SidebarMenuItem>
        <NavItemButton
          item={item}
          isNested={isNested}
          isActive={isActive}
        />
        {item.items?.length ? (
          <NavItemSubMenu item={item} toggleItem={toggleItem} />
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  )
}

interface NavItemButtonProps {
  item: NavMain
  isNested: boolean
  isActive: boolean
}

function NavItemButton({ item, isNested, isActive }: NavItemButtonProps) {
  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      tooltip={item.title}
    >
      <Link href={item.url ?? '#'} target={item.target}>
        {<NavIcon item={item} isNested={isNested} />}
        <span>
          {item.title}
          {item.label && (
            <NavLabel label={item.label} />
          )}
        </span>
      </Link>
    </SidebarMenuButton>
  )
}

interface NavIconProps {
  item: NavMain,
  isNested: boolean
}

function NavIcon({ item, isNested }: NavIconProps) {
  if (!item.icon || isNested) {
    return null
  }

  if (typeof item.icon === 'string') {
    return item.icon
  }

  return <item.icon />
}

interface NavLabelProps {
  label: NavLabel
}

function NavLabel({ label }: NavLabelProps) {
  if (typeof label === 'string') {
    return (
      <Badge className="text-xs font-thin px-1 py-0 ml-2">
        {label}
      </Badge>
    )
  }

  return (
    <Badge
      {...label}
      className="text-xs font-thin px-1 py-0 ml-2"
    />
  )
}

interface NavItemSubMenuProps {
  item: NavMain
  toggleItem: (title: string) => void
}

function NavItemSubMenu({ item, toggleItem }: NavItemSubMenuProps) {
  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuAction
          onClick={() => toggleItem(item.title)}
          className="data-[state=open]:rotate-90"
        >
          <ChevronRight />
          <span className="sr-only">
            Toggle
          </span>
        </SidebarMenuAction>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <NavItem items={item.items!} isNested />
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  )
}