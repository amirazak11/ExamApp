import { HelpCircle } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { QuestionForm } from "./_components/question-form"

type Props = { params: Promise<{ examId: string }> }

export default async function AddQuestionPage({ params }: Props) {
  const { examId } = await params

  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Questions", href: `/exams/${examId}/questions` },
          { label: "Add Question" },
        ]}
      />
      <div className="p-6 space-y-4">
        <Header title="Add Question" icon={HelpCircle} backbutton />
        <QuestionForm examId={examId} />
      </div>
    </>
  )
}
