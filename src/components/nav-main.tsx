"use client"

import { usePathname } from "next/navigation"
import { type Icon } from "@tabler/icons-react"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? pathname === item.url
                : pathname.startsWith(item.url)

            return (
              <Link key={item.title} href={item.url}>
                <SidebarMenuItem
                  className={cn(
                    "rounded-md",
                    isActive
                      ? "bg-white text-black"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}