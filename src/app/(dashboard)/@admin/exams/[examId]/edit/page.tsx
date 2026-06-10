import { EditExamPageClient } from "./_components/edit-exam-page-client"

type Props = { params: Promise<{ examId: string }> }

export default async function EditExamPage({ params }: Props) {
  const { examId } = await params
  return <EditExamPageClient examId={examId} />
}
