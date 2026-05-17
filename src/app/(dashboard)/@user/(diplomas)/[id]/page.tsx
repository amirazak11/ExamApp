import { Suspense } from "react";
import ExamsSkeleton from "../_components/Exam-skeleton";
import { AppBreadcrumb } from "../_components/shared/breadcremb";
import { Header } from "../_components/shared/header";
import {  FolderCodeIcon } from 'lucide-react'

type ExamsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExamsPage({ params }: ExamsPageProps) {
  const { id  } = await params;

    return (

    <>
      <AppBreadcrumb   items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]} />
        <div className="p-6 space-y-3">
      <Header backbutton={true}  title="Diplomas" icon={FolderCodeIcon} />
          <Suspense fallback={<div>Loading...</div>}>

       <ExamsSkeleton diplomaId={id }/>
       </Suspense>
        </div>
    </>
  )
}

