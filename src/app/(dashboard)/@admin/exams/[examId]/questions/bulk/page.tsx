import { BulkQuestionForm } from "./_components/bulk-question-form"

type Props = { params: Promise<{ examId: string }> }

export default async function BulkAddQuestionsPage({ params }: Props) {
  const { examId } = await params

  return <BulkQuestionForm examId={examId} />
}
