import { OtpForm } from "./otp"

type Props = {
  email: string
  onBack: () => void
  updateFormData?: (data: { otp: string }) => void
  onResendCode: () => void
  onVerifyOtp: (otp: string) => void
  isPending?: boolean
}

export default function VerifyOtpStep({
  email,
  onBack,
  updateFormData,
  onResendCode,
  onVerifyOtp,
  isPending,
}: Props) {
  return (
    <>
      <p className="mt-6 text-center text-sm text-slate-500">
        {email}{" "}
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
      </p>

      <OtpForm
        updateFormData={updateFormData}
        onResendCode={onResendCode}
        onVerifyOtp={onVerifyOtp}
        isPending={isPending}
      />
    </>
  )
}