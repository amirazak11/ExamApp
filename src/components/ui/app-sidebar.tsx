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
  MoreVertical,
  LogOut,
  Logs,
  LockKeyhole,
  type LucideIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
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
  footerType?: "user" | "logout";
};

const iconMap: Record<string, LucideIcon> = {
  diplomas: GraduationCap,
  GraduationCap: GraduationCap,
  user: UserRound,
  UserRound: UserRound,
  profile: UserRound,
  lock: LockKeyhole,
  LockKeyhole: LockKeyhole,
  KeyRound: LockKeyhole,
  logs: Logs
};

export function AppSidebar({
  menuItems,
  appName = "Exam App",
  logoSrc,
  className,
  footerType = "user",
}: AppSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.username;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.profilePhoto;

  return (
    <Sidebar
      className={cn("h-screen", className)}
      collapsible="none"
    >
      {logoSrc && (
        <SidebarHeader className="px-4 py-6">
          <div>
            <Image
              src={logoSrc}
              alt={`${appName} Logo`}
              width={120}
              height={40}
              className="h-auto w-28"
            />

            <h1 className="mt-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <FolderCode className="size-4" />
              {appName}
            </h1>
          </div>
        </SidebarHeader>
      )}

      <SidebarContent>
        <SidebarGroup className="px-4">
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon] ?? FolderCode;

              const isActive = item.exact
                ? pathname === item.link
                : pathname === item.link ||
                  pathname.startsWith(`${item.link}/`);

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      "h-auto w-full rounded-none border px-3 py-3 text-sm",
                      isActive
                        ? "border-blue-500 bg-blue-100 text-blue-600"
                        : "border-transparent text-gray-500 hover:bg-blue-100"
                    )}
                  >
                    <Link href={item.link} className="flex items-center gap-2">
                      <Icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {footerType === "user" ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="h-auto w-full justify-start gap-3 rounded-none px-0 py-0 hover:bg-transparent"
              >
                <Link href="/settings">
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden border border-blue-500 bg-blue-100">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt={userName ?? "User"}
                        width={40}
                        height={40}
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound className="size-5 text-blue-500" />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                    <span className="truncate text-xs font-semibold text-blue-500">
                      {userName ?? "Firstname"}
                    </span>

                    <span className="truncate text-[10px] text-gray-500">
                      {userEmail ?? "user-email@example.com"}
                    </span>
                  </div>

                  <MoreVertical className="size-4 shrink-0 text-gray-400" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-2 bg-red-50 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-100"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}