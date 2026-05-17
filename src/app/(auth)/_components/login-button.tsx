import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export type RegisterButtonVariant = "next" | "previous" | "submit" | "delete";

type RegisterButtonProps = {
  variant?: RegisterButtonVariant;
  type?: "submit" | "button";
  className?: string;
  isPending?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const variantStyles: Record<RegisterButtonVariant, string> = {
  submit: "bg-blue-600 text-white hover:bg-blue-700",
  next: "bg-blue-50 border-blue-600 border  text-black hover:bg-blue-100",
  previous: "bg-gray-200 text-gray-500 hover:bg-gray-300",
  delete: "bg-red-600 text-white hover:bg-red-700",
};

const variantLabels: Record<RegisterButtonVariant, ReactNode> = {
  submit: "Submit",
  next: (
    <span className="flex items-center justify-center gap-2">
      Next <ChevronRight size={16} />
    </span>
  ),
  previous: (
    <span className="flex items-center justify-center gap-2">
      <ChevronLeft size={16} /> Previous
    </span>
  ),
  delete: (
    <span className="flex items-center justify-center gap-2">
      <Trash2 size={16} /> Delete My Account
    </span>
  ),
};

export default function RegisterButton({
  variant = "submit",
  type,
  className,
  isPending = false,
  disabled = false,
  onClick,
}: RegisterButtonProps) {
  return (
    <button
      type={type ?? (variant === "submit" ? "submit" : "button")}
      onClick={onClick}
      disabled={isPending || disabled}
      className={cn(
        "mt-4 h-11 w-full rounded-none text-sm font-medium transition",
        variantStyles[variant],
        (isPending || disabled) && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {isPending ? "Loading..." : variantLabels[variant]}
    </button>
  );
}
