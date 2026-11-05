import { redirect } from "next/navigation"

type Props = { params: Promise<{ examId: string }> }

// Questions are listed on the exam page.
export default async function AdminQuestionsPage({ params }: Props) {
  const { examId } = await params

  redirect(`/exams/${examId}`)
}
