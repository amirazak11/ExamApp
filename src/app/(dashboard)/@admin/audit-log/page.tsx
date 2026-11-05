import { PageHeader } from "../_components/shared/page-header"
import { AuditLogList } from "./_components/audit-log-list"

export default function AdminAuditLogPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Audit Log" }]} />
      <AuditLogList />
    </>
  )
}
