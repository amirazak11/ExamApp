import { ChevronLeft, ChevronRight } from "lucide-react";

type RegisterButtonProps = {
  variant?: "next" | "previous" | "submit";
  isPending?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function RegisterButton({
  variant = "submit",
  isPending = false,
  disabled = false,
  onClick,
}: RegisterButtonProps) {
  const isSubmit = variant === "submit";
  const isPrevious = variant === "previous";

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      disabled={isPending || disabled}
      className={`mt-4 h-11 w-full rounded-none text-sm font-medium transition ${
        isPrevious
          ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${isPending || disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {isPending ? (
        "Loading..."
      ) : variant === "next" ? (
        <span className="flex items-center justify-center gap-2">
          Next <ChevronRight size={16} />
        </span>
      ) : variant === "previous" ? (
        <span className="flex items-center justify-center gap-2">
          <ChevronLeft size={16} /> Previous
        </span>
      ) : (
        "Submit"
      )}
    </button>
  );
}