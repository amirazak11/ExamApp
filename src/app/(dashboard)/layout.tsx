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
    title: "Exams",
    icon: "BookOpen",
    link: "/exams",
    roles: ["user", "admin"],
  },
  {
    id: 3,
    title: "Account Settings",
    icon: "UserRound",
    link: "/settings",
    roles: ["user", "admin"],
  },
  {
    id: 4,
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

  const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(session.user.role);
  const sessionUser = isAdmin ? "admin" : "user";

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(sessionUser)
  );

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
          logoSrc="/logo.png"
          footerType="user"
          variant={isAdmin ? "dark" : "light"}
          className={isAdmin ? "bg-gray-800 text-white" : "bg-gray-50"}
        />

        <main className="w-full h-screen">
          {isAdmin ? (
            <div className="h-full overflow-y-auto bg-gray-100">{admin}</div>
          ) : (
            user
          )}
        </main>
      </SidebarProvider>
    </div>
  );
}
