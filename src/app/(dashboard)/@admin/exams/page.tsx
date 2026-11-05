import { PageHeader } from "../_components/shared/page-header"
import { AdminExamsList } from "./_components/admin-exams-list"

export default function AdminExamsPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Exams" }]} />
      <AdminExamsList />
    </>
  )
}
