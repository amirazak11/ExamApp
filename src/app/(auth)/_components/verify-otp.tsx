import { OtpForm } from "./otp"

type Props = {
  email: string
  onNext: () => void
  onBack: () => void
  updateFormData: (data: { otp: string }) => void
}

export default function VerifyOtpStep({
  email,
  onBack,
  onNext,
  updateFormData,
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
        email={email}
        onNext={onNext}
        updateFormData={updateFormData}
      />
    </>
  )
}