"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Header } from "@/app/(auth)/_components/header"
import { StepperHeader } from "@/app/(auth)/_components/stepper-header"

import { CreateAccountStep } from "./change-email"

import useChangeEmail from "@/features/setting/_hooks/use-changeemail"
import useConfirm from "@/features/setting/_hooks/use-confirm"
import VerifyOtpStep from "@/app/(auth)/_components/verify-otp"

type ChangeEmailFormData = {
  email: string
  otp: string
}

const steps = [
  {
    id: 1,
    title: "Change Email",
    subtitle: "Enter your new email",
  },
  {
    id: 2,
    title: "Verify OTP",
    subtitle: "Verify your new email",
    description:
      "We've sent a verification code to your email. Please enter it to continue.",
  },
]

export default function EmailStepperPage() {
  const { changeEmail, isPending } = useChangeEmail()
  const { confirmOtp, isPending: isConfirmPending } = useConfirm()

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState<Partial<ChangeEmailFormData>>({
    email: "",
    otp: "",
  })

  const progressValue = (step / steps.length) * 100

  const nextStep = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const updateFormData = (data: Partial<ChangeEmailFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const handleChangeEmail = (email: string) => {
    changeEmail(
      { email },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ email })
            toast.success("Code sent successfully")
            nextStep()
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  }

  const resendChangeEmailCode = () => {
    if (!formData.email) {
      toast.error("Email is required")
      return
    }

    changeEmail(
      { email: formData.email },
      {
        onSuccess: (response) => {
          if (response.status) {
            toast.success("Code sent successfully")
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  }

  const handleConfirmEmailOtp = (otp: string) => {
    if (!formData.email) {
      toast.error("Email is required")
      return
    }

    confirmOtp(
      {
        code: otp,
      },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ otp })
            toast.success("Email changed successfully")
          }
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  }

  return (
    <>
      <StepperHeader
        steps={steps}
        currentStep={step}
        progressValue={progressValue}
      />

      <Header
        title={steps[step - 1].title}
        subtitle={steps[step - 1].subtitle}
        description={steps[step - 1].description}
      />

      {step === 1 && (
        <CreateAccountStep
          email={formData.email ?? ""}
          updateFormData={updateFormData}
          onSubmitEmail={handleChangeEmail}
          isPending={isPending}
          buttonVariant="next"
        />
      )}

      {step === 2 && (
        <VerifyOtpStep
          email={formData.email ?? ""}
          onBack={prevStep}
          updateFormData={updateFormData}
          onResendCode={resendChangeEmailCode}
          onVerifyOtp={handleConfirmEmailOtp}
          isPending={isConfirmPending}
        />
      )}
    </>
  )
}