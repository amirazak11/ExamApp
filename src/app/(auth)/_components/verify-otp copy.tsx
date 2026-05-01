import { OtpForm } from "./otp"

type Props = {
  email: string
  onNext: () => void
  onBack: () => void
  updateFormData: (data: { otp: string }) => void
}

export default function PasswordResetSent({
  email,
  onBack,
  onNext,
  updateFormData,
}: Props) {
  return (
    <>
      <p className="mt-6 text-center text-sm text-gray-800">
        {email}{" "}
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-blue-600 hover:underline"
        >
          Edit
        </button>
      </p>
<p className="text-gray-800">
  Please check your inbox and follow the instructions to reset your password.
</p>
<p className="text-gray-500">
  If you don’t see the email within a few minutes, check your spam or junk folder.
</p>
    </>
  )
}