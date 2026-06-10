import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb"
import { AdminExamsList } from "./_components/admin-exams-list"

export default function AdminExamsPage() {
  return (
    <>
      <AppBreadcrumb items={[{ label: "Exams" }]} />
      <div className="p-6 space-y-4">
        <AdminExamsList />
      </div>
    </>
  )
}
