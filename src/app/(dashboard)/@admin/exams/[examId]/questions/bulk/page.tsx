import { HelpCircle } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { BulkQuestionForm } from "./_components/bulk-question-form"

type Props = { params: Promise<{ examId: string }> }

export default async function BulkAddQuestionsPage({ params }: Props) {
  const { examId } = await params

  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Questions", href: `/exams/${examId}/questions` },
          { label: "Bulk Add" },
        ]}
      />
      <div className="p-6 space-y-4">
        <Header title="Bulk Add Questions" icon={HelpCircle} backbutton />
        <BulkQuestionForm examId={examId} />
      </div>
    </>
  )
}
