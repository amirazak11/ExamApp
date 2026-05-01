"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FolderCode,
  GraduationCap,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type MenuItem = {
  id: number | string;
  title: string;
  icon: string;
  link: string;
  exact?: boolean;
};

type AppSidebarProps = {
  menuItems: MenuItem[];
  appName?: string;
  logoSrc?: string;
  className?: string;
};

const iconMap: Record<string, LucideIcon> = {
  diplomas: GraduationCap,
  user: UserRound,
};

export function AppSidebar({
  menuItems,
  appName = "Exam App",
  logoSrc,
  className,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar
      className={cn("h-screen gap-8 bg-blue-50", className)}
      collapsible="none"
    >
      {logoSrc && (
        <>
          {" "}
          <SidebarHeader className="px-4">
            <div>
              {" "}
              <Image
                src={logoSrc}
                alt={`${appName} Logo`}
                width={32}
                height={32}
                className="size-8"
              />
              <h1 className="mt-3 flex items-center gap-2 text-sm font-medium text-[#1f5ef3]">
                {" "}
                <FolderCode className="size-8" /> {appName}{" "}
              </h1>{" "}
            </div>{" "}
          </SidebarHeader>{" "}
        </>
      )}
      <SidebarContent>
        <SidebarGroup className="px-3">
          <SidebarMenu>
{menuItems.map((item) => {
  const Icon = iconMap[item.icon];

  const isActive = item.exact
    ? pathname === item.link
    : pathname === item.link || pathname.startsWith(`${item.link}/`);

  return (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "h-auto w-full rounded-none px-3 py-4 text-base",
          isActive
            ? "border-2 border-blue-500 text-blue-500"
            : "border-2 border-transparent text-gray-500"
        )}
      >
        <Link href={item.link} className="flex items-center gap-2">
          {Icon && <Icon className="size-4" />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
})}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3" />
    </Sidebar>
  );
}
