import { QuestionDetail } from "./_components/question-detail"

type Props = { params: Promise<{ examId: string; questionId: string }> }

export default async function AdminQuestionDetailPage({ params }: Props) {
  const { examId, questionId } = await params

  return <QuestionDetail examId={examId} questionId={questionId} />
}
