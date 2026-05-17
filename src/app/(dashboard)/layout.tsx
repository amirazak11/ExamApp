import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}

const menuItems = [
  {
    id: 1,
    title: "Diplomas",
    icon: "GraduationCap",
    link: "/",
    roles: ["user", "admin"],
  },
  {
    id: 2,
    title: "Account Settings",
    icon: "UserRound",
    link: "/settings",
    roles: ["user", "admin"],
  },
  {
    id: 3,
    title: "Audit Log",
    icon: "logs",
    link: "/audit-log",
    roles: ["admin"],
  },
];

export default async function Layout({ admin, user }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const sessionUser = session.user.role.toLowerCase();
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(sessionUser)
  );
  const isAdmin = sessionUser === "admin";

  return (
    <div className="h-screen overflow-hidden">
      <SidebarProvider
        className="h-full bg-white"
        style={
          {
            "--sidebar-width": "20rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar
          menuItems={filteredMenuItems}
          logoSrc="/zeus.png"
          footerType="user"
        />

        <main
          className={`w-full h-screen ${
            isAdmin ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {isAdmin ? admin : user}
        </main>
      </SidebarProvider>
    </div>
  );
}