"use client"

import React from "react"
import { omit } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import { navigation } from "@/config/navigation"
import { NavMain, NavTeam } from "@/types/navigation"

import { NavUser } from "@/components/nav-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TeamSwitcher } from "@/components/team-switcher"
import { NavMain as NavMainComp } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = useAuthStore()
  const navKeys = Object.keys(
    omit(navigation, 'teams')
  ) as (keyof typeof navigation)[]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigation.teams as NavTeam[]} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {navKeys.map((key, idx) => (
            <NavMainComp
              key={idx}
              label={key !== 'main' ? key : ''}
              items={navigation[key] as NavMain[]}
            />
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
