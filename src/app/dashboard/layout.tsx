"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/shadcn/sidebar"
import { IconCamera, IconChartBar, IconDashboard, IconDatabase, IconFileAi, IconFileDescription, IconFileWord, IconFolder, IconHelp, IconListDetails, IconReport, IconSearch, IconSettings, IconUsers } from "@tabler/icons-react"

// import data from "./data.json"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navTitle: [
    "Informations",
    "Storage",
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    }
  ],
  documents: [
    {
      name: "Films",
      url: "/dashboard/films",
      icon: IconReport,
    },
    {
      name: "Series",
      url: "/dashboard/series",
      icon: IconFileWord,
    },
    {
      name: "Data Base",
      url: "/dashboard/database",
      icon: IconDatabase,
    },
  ],
}


export default function Page({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" data={data} />
      <SidebarInset>
        <SiteHeader />
          {children}
      </SidebarInset>
    </SidebarProvider>
  )
}