import { ClipboardList } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { NewExamForm } from "./_components/new-exam-form"

export default function AddNewExamPage() {
  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Add New Exam" },
        ]}
      />
      <div className="p-6 space-y-4">
        <Header title="Add New Exam" icon={ClipboardList} backbutton />
        <NewExamForm />
      </div>
    </>
  )
}
