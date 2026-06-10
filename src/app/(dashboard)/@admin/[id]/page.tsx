import { DiplomaDetail } from "./_components/diploma-detail"

type Props = { params: Promise<{ id: string }> }

export default async function AdminDiplomaDetailPage({ params }: Props) {
  const { id } = await params

  return <DiplomaDetail id={id} />
}
