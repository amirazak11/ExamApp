import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { FolderCodeIcon } from 'lucide-react'
import { Header } from "../(diplomas)/_components/shared/header"
import { AppBreadcrumb } from "../(diplomas)/_components/shared/breadcremb"

export default function Layout({ children }: { children: React.ReactNode }) {
const userMenu = [
  {
    id: 1,
    title: "Profile",
    icon: "UserRound",
    link: "/settings",
  },
  {
    id: 2,
    title: "Change Password",
    icon: "KeyRound",
    link: "/settings/change-password",
  },
]
  return (
    <>
<div className="max-h-full gap-3">
          <AppBreadcrumb  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]} />

<div className="p-6 space-y-3">
      <Header title="Settings" icon={FolderCodeIcon} />
  
    <SidebarProvider className="h-[calc(100vh-180px)] gap-4 "
      style={
        {
          "--sidebar-width": "20rem",

        } as React.CSSProperties
      }
    >
      <AppSidebar className="bg-white h-full" menuItems={userMenu} footerType="logout" />

          {children}
</SidebarProvider>
</div>
        </div>


</>
  )
}
