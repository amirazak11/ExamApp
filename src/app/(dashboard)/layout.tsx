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
    {
    id: 4,
    title: "Exams",
    icon: "UserRound",
    link: "/Exams",
    roles: ["admin"],
  },
];

export default async function Layout({ admin, user,children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

    // const sessionUser = session.user.role.toLowerCase();
        const sessionUser = "admin";

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
                   className={` ${
            isAdmin ? "bg-foreground text-white" : "bg-gray-50"
          }`}
        />

        <main
          className={`w-full h-screen `}
        >
           {isAdmin ? admin : user}


        </main>
      </SidebarProvider>
    </div>
  );
}