"use client"

import * as React from "react"
import {
  DatabaseZap,
  Clapperboard,
  GalleryVerticalEnd,
  TvMinimalPlay,
  Settings2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/shadcn/sidebar"


const data = {
  user: {
    name: "Streamly",
    email: "Administrator",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Streamly",
      logo: GalleryVerticalEnd,
      plan: "Dashboard",
    }
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Actives Users",
          url: "/dashboard/users",
        },
        {
          title: "New Account",
          url: "/dashboard/new-user",
        },
        {
          title: "Administrators",
          url: "/dashboard/admins",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Films",
      url: "#",
      icon: Clapperboard,
    },
    {
      name: "Series",
      url: "#",
      icon: TvMinimalPlay,
    },
    {
      name: "Data base",
      url: "#",
      icon: DatabaseZap,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
