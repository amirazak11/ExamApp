import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { AppBreadcrumb } from "../(diplomas)/_components/shared/breadcremb"
import {  FolderCodeIcon } from 'lucide-react'
import { Header } from "../(diplomas)/_components/shared/header"
export default function Layout({ children }: { children: React.ReactNode }) {
const userMenu = [
  {
    id: 1,
    title: "profile",
    icon: "diplomas",
    link: "/settings",
  },
  {
    id: 2,
    title: "change password",
    icon: "user",
    link: "/settings/change-password",
  },
]
  return (
    <>
<div className="max-h-full gap-3">
          <AppBreadcrumb   items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]} />

<div className="p-6 space-y-3">
      <Header title="Settings" icon={FolderCodeIcon} />
{/* <DiplomasSkeleton/> */}
  
    <SidebarProvider className="h-full gap-4 "
      style={
        {
          "--sidebar-width": "20rem",

        } as React.CSSProperties
      }
    >
      <AppSidebar className="bg-white" menuItems={userMenu} />

          {children}
</SidebarProvider>
</div>
        </div>


</>
  )
}
