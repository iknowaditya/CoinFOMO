"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileChartLine,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio",
    url: "/portfolio",
    icon: FileChartLine,
  },
  {
    title: "Widgets",
    url: "/app-widgets",
    icon: BarChart3,
  },
];

// Skeleton component for sidebar items
const SidebarSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Logo Skeleton */}
      <div className="h-16 flex items-center px-6">
        <Skeleton className="h-8 w-[140px]" />
      </div>
      <SidebarSeparator />

      {/* Menu Items Skeleton */}
      <div className="px-6 space-y-6">
        <Skeleton className="h-4 w-[60px]" /> {/* Menu label */}
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-5 w-5" /> {/* Icon */}
              <Skeleton className="h-4 w-[100px]" /> {/* Text */}
            </div>
          ))}
        </div>
      </div>

      {/* General Section Skeleton */}
      <div className="px-6 space-y-6">
        <Skeleton className="h-4 w-[70px]" /> {/* General label */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default function AppSidebar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Sidebar collapsible="icon" variant="floating" className="min-h-screen">
        <SidebarSkeleton />
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" variant="floating" className="min-h-screen">
      <SidebarHeader className="h-16 flex items-center px-6 justify-center">
        <SidebarMenuButton asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="font-medium text-xl">CoinFOMO</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase tracking-wider text-gray-400">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase tracking-wider text-gray-400">
            General
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link
                    href="/settings"
                    className="flex items-center gap-4 rounded-lg px-3 py-2 hover:bg-neutral-800"
                  >
                    <Settings className="h-5 w-5 shrink-0" />
                    <span className="text-sm">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
