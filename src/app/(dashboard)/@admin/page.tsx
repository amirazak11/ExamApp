import { PageHeader } from "./_components/shared/page-header";
import { AdminDiplomasList } from "./_components/admin-diplomas-list";

export default function AdminDiplomasPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Diplomas" }]} />
      <AdminDiplomasList />
    </>
  );
}
