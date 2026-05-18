import { X } from "lucide-react";

type ErrorAlertProps = {
  message?: string;
};

export default function ErrorAlert({
  message = "Something went wrong",
}: ErrorAlertProps) {
  return (
    <div className="relative w-full border border-red-500 bg-red-50 px-4 h-9 text-center text-red-500 flex items-center justify-center">
      <span className="absolute left-1/2 top-0 flex size-5 text-sm -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500 bg-red-50">
        <X size={14} />
      </span>

      <p className="text-sm font-medium tracking-wide">{message}</p>
    </div>
  );
}