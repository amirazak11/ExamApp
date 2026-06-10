import Link from "next/link";
import { FolderCodeIcon, Plus } from "lucide-react";
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb";
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header";
import { Suspense } from "react";
import { AdminDiplomasList } from "./_components/admin-diplomas-list";

export default function AdminDiplomasPage() {
  return (
    <>
      <AppBreadcrumb items={[{ label: "Diplomas" }]} />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Header title="Diplomas" icon={FolderCodeIcon} className="flex-1" />
          <Link
            href="/new"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 text-sm font-medium transition-colors shrink-0"
          >
            <Plus className="size-4" />
            Add New Diploma
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <AdminDiplomasList />
        </Suspense>
      </div>
    </>
  );
}
