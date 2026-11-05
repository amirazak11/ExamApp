import { QuestionForm } from "./_components/question-form"

type Props = { params: Promise<{ examId: string }> }

export default async function AddQuestionPage({ params }: Props) {
  const { examId } = await params

  return <QuestionForm examId={examId} />
}
