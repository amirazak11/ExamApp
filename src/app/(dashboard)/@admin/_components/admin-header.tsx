import { LayoutDashboard } from "lucide-react";

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 bg-foreground px-4 py-3 text-white flex-1">
        <LayoutDashboard className="size-5" />
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
    </div>
  );
}
