import { FolderCodeIcon } from "lucide-react";
import { AppBreadcrumb } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/breadcremb";
import { Header } from "@/app/(dashboard)/@user/(diplomas)/_components/shared/header";
import { NewDiplomaForm } from "./_components/new-diploma-form";

export default function AddNewDiplomaPage() {
  return (
    <>
      <AppBreadcrumb
        items={[{ label: "Diplomas", href: "/" }, { label: "Add New Diploma" }]}
      />
      <div className="p-6 space-y-4">
        <Header title="Add New Diploma" icon={FolderCodeIcon} backbutton />
        <NewDiplomaForm />
      </div>
    </>
  );
}
