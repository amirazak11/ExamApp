
import * as React from "react"
import { getQuestions } from "@/features/questions/apis/exams.api";
import { AppBreadcrumb } from "../../_components/shared/breadcremb";
import { Header } from "../../_components/shared/header";
import {  FolderCodeIcon } from 'lucide-react'
import Questions from "./_components/Exam-questions";
interface ExamPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
export default async function Exam({ params }: ExamPageProps) {
  const { id } = await params;
  const payload = await getQuestions(id);
  const examTitle = payload?.questions?.[0]?.exam?.title ?? "Exam";

  return (
<>

      <AppBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Diplomas", href: "/" }, { label: "Exams", href: `/${id}` }, { label: examTitle }]} />
        <div className="p-6 space-y-3">
      <Header title="Diplomas" icon={FolderCodeIcon} />
    <Questions examId={ id } data={payload?.questions}/>
        </div>

</>

  )
}
