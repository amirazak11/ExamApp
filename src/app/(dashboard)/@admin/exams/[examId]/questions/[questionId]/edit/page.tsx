import { EditQuestionPageClient } from "./_components/edit-question-page-client"

type Props = { params: Promise<{ examId: string; questionId: string }> }

export default async function EditQuestionPage({ params }: Props) {
  const { examId, questionId } = await params

  return <EditQuestionPageClient examId={examId} questionId={questionId} />
}
