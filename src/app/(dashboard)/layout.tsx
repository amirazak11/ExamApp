import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { GraduationCap, UserRound } from "lucide-react"
export default function Layout({ children }: { children: React.ReactNode }) {
const userMenu = [
  {
    id: 1,
    title: "Diplomas",
    icon: "diplomas",
    link: "/",
  },
  {
    id: 2,
    title: "Account Settings",
    icon: "user",
    link: "/settings",
  },
]
  return (
    <>
<div className="h-screen overflow-hidden">
    <SidebarProvider className="h-full bg-white"
      style={
        {
          "--sidebar-width": "20rem",

        } as React.CSSProperties
      }
    >
      
      <AppSidebar menuItems={userMenu} logoSrc="/zeus.png" />
<main className=" w-full bg-gray-50 h-screen" >
  
          {children}
        </main>
</SidebarProvider>
</div>

</>
  )
}
