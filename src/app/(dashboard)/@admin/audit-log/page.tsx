import { Logs } from "lucide-react"
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header"
import { AuditLogList } from "./_components/audit-log-list"

export default function AdminAuditLogPage() {
  return (
    <>
      <AppBreadcrumb items={[{ label: "Audit Log" }]} />
      <div className="p-6 space-y-4">
        <Header title="Audit Log" icon={Logs} />
        <AuditLogList />
      </div>
    </>
  )
}
