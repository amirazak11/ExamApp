import Link from "next/link"
import { HelpCircle, Plus } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { Button } from "@/components/ui/button"
import { QuestionsList } from "./_components/questions-list"

type Props = { params: Promise<{ examId: string }> }

export default async function AdminQuestionsPage({ params }: Props) {
  const { examId } = await params

  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Questions" },
        ]}
      />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Header title="Questions" icon={HelpCircle} className="flex-1" backbutton />
          <div className="flex gap-2 shrink-0">
            <Button
              variant="outline"
              className="rounded-none border-gray-300 gap-2 text-gray-700"
              asChild
            >
              <Link href={`/exams/${examId}/questions/bulk`}>
                Bulk Add
              </Link>
            </Button>
            <Button
              className="rounded-none gap-2 bg-emerald-500 hover:bg-emerald-600"
              asChild
            >
              <Link href={`/exams/${examId}/questions/new`}>
                <Plus className="size-4" />
                Add Question
              </Link>
            </Button>
          </div>
        </div>
        <QuestionsList examId={examId} />
      </div>
    </>
  )
}
