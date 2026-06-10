import { AuditLogDetail } from "./_components/audit-log-detail"

type Props = { params: Promise<{ id: string }> }

export default async function AuditLogDetailPage({ params }: Props) {
  const { id } = await params

  return <AuditLogDetail id={id} />
}
