import { ExamDetail } from "./_components/exam-detail"

type Props = { params: Promise<{ examId: string }> }

export default async function AdminExamDetailPage({ params }: Props) {
  const { examId } = await params

  return <ExamDetail examId={examId} />
}
