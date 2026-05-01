"use client"

import { useState } from "react"
import { Header } from "../_components/header"
import { IRegisterFields } from "@/lib/types/auth"
import PasswordResetSent from "../_components/verify-otp copy"
import { ForgetPasswordStep } from "../_components/forgetpassword"

const steps = [
  { id: 1, title: "Create Account", subtitle: "Tell us more about you" },
  {
    id: 2,
    title: "Verify OTP",
    subtitle: "Verify your account",
    description: "We've sent a verification code to your email. Please enter it to continue.",
  },
  { id: 3, title: "Create Password", subtitle: "Secure your account" },
  { id: 4, title: "Complete Profile", subtitle: "Finish your setup" },
]


export default function RegisterStepperPage() {
  const [step, setStep] = useState(1)

const [formData, setFormData] = useState<Partial<IRegisterFields>>({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
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

const updateFormData = (data: Partial<IRegisterFields>) => {
  setFormData((prev) => ({
    ...prev,
    ...data,
  }))
}

  return (
    <section className="flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md space-y-6">
        <Header
          title={steps[step - 1].title}
          subtitle={steps[step - 1].subtitle}
          description={steps[step - 1].description}
        />

        <div className="space-y-4">
          {step === 1 && (
            <ForgetPasswordStep
              onNext={nextStep}
             email={formData.email ?? ""}
              updateFormData={updateFormData}
            />
          )}

          {step === 2 && (
            <PasswordResetSent
              onNext={nextStep}
              onBack={prevStep}
              email={formData.email ?? ""}
              updateFormData={updateFormData}
            />
          )}

        </div>
      </div>
    </section>
  )
}