import { AppBreadcrumb } from './_components/shared/breadcremb'
import {  FolderCodeIcon } from 'lucide-react'
import { Header } from './_components/shared/header'
import DiplomasSkeleton from './_components/Doploma-skeleton'
import { Suspense } from 'react'
export default async function Diplomas() {
  
  return (

    <>
      <AppBreadcrumb   items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]} />

        <div className="p-6 space-y-3">
      <Header title="Diplomas" icon={FolderCodeIcon} />
                  <Suspense fallback={<div>Loading...</div>}>

       <DiplomasSkeleton/>
       </Suspense>
        </div>
    </>
  )
}
