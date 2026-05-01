"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => router.back()}
      className=" rounded-sm border-blue-500 text-blue-600 hover:bg-blue-50"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}