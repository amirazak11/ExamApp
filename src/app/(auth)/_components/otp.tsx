"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import useEmail from "../login/_hooks/use-email"
import useOtp from "../login/_hooks/use-otp"

type OtpFormValues = {
  otp: string
}

type Props = {
  email: string
  onNext: () => void
  updateFormData: (data: { otp: string }) => void
}

export function OtpForm({
  email,
  onNext,
  updateFormData,
}: Props) {
  const [seconds, setSeconds] = useState(0)
  const [isVerificationStarted, setIsVerificationStarted] = useState(false)
  const [isResend, setIsResend] = useState(true)
  const { createEmail } = useEmail()
  const { sendOtp } = useOtp()

  const { control, handleSubmit, watch } = useForm<OtpFormValues>({
    defaultValues: {
      otp: ""
    },
  })

  const otp = watch("otp")

  useEffect(() => {
    if (!isVerificationStarted || seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isVerificationStarted, seconds])

  const handleFormSubmit = (data: OtpFormValues) => {
    sendOtp(
      { email, code: data.otp },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ otp: data.otp })
                onNext()
          }
        },
        onError: (error) => {
                       toast.error(error.message)
                        setIsVerificationStarted(true)
                       setSeconds(60)
        },
      }
    )
  }

  const resendCode = () => {
    createEmail(
      { email },
      {

      }
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <InputOTP
            className="justify-center"
            maxLength={6}
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue)
              updateFormData({ otp: newValue })
            }}
          >
            <InputOTPGroup className="mx-auto gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
      />

        <div>
          <button
            type="submit"
            disabled={otp.length !== 6}
            className="mx-auto block h-11 bg-transparent text-sm font-medium text-gray-800 disabled:opacity-50"
          >
           Verify Code
          </button>
        </div>

      {isVerificationStarted && seconds > 0 && (
        <div className="text-center text-sm text-gray-500">
          You can request another code in: {seconds}s.
        </div>
      )}

      {!isResend && isVerificationStarted && seconds === 0 && (
        <div className="text-center">
          <button
            type="button"
            onClick={resendCode}
            className="mx-auto block bg-transparent text-sm font-medium text-slate-800 disabled:opacity-50"
          >
            Resend Code
          </button>
        </div>
      )}
    </form>
  )
}