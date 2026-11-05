import { EditDiplomaPageClient } from "./_components/edit-diploma-page-client"

type Props = { params: Promise<{ id: string }> }

export default async function EditDiplomaPage({ params }: Props) {
  const { id } = await params

  return <EditDiplomaPageClient id={id} />
}
