"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Header } from "../_components/header";
import VerifyOtpStep from "../_components/verify-otp";
import { StepperHeader } from "../_components/stepper-header";
import { IRegisterFields } from "@/lib/types/auth";
import RegisterPage from "../_components/register-form";
import CreatePasswordStep from "../_components/create-password";
import { CreateAccountStep } from "../_components/create-account";

import useEmail from "../login/_hooks/use-email";
import useOtp from "../login/_hooks/use-otp";

const steps = [
  { id: 1, title: "Create Account", subtitle: "Tell us more about you" },
  {
    id: 2,
    title: "Verify OTP",
    subtitle: "Verify your account",
    description:
      "We've sent a verification code to your email. Please enter it to continue.",
  },
  { id: 3, title: "Create Password", subtitle: "Secure your account" },
  { id: 4, title: "Complete Profile", subtitle: "Finish your setup" },
];

export default function RegisterStepperPage() {
  const { createEmail, isPending } = useEmail();
  const { sendOtp, isPending: isOtpPending } = useOtp();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<Partial<IRegisterFields>>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const progressValue = (step / steps.length) * 100;

  const nextStep = () => {
    if (step < steps.length) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const updateFormData = (data: Partial<IRegisterFields>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleRegisterEmail = (email: string) => {
    createEmail(
      { email },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ email });
            toast.success("Email submitted successfully");
            nextStep();
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const resendRegisterCode = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    createEmail(
      { email: formData.email },
      {
        onSuccess: (response) => {
          if (response.status) {
            toast.success("Code sent successfully");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleVerifyRegisterOtp = (otp: string) => {
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    sendOtp(
      {
        email: formData.email,
        code: otp,
      },
      {
        onSuccess: (response) => {
          if (response.status) {
            updateFormData({ otp });
            toast.success("OTP verified successfully");
            nextStep();
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <StepperHeader
        steps={steps}
        currentStep={step}
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
          onSubmitEmail={handleRegisterEmail}
          isPending={isPending}
          showLoginLink
          buttonVariant="next"
        />
      )}

      {step === 2 && (
        <VerifyOtpStep
          email={formData.email ?? ""}
          onBack={prevStep}
          updateFormData={updateFormData}
          onResendCode={resendRegisterCode}
          onVerifyOtp={handleVerifyRegisterOtp}
          isPending={isOtpPending}
        />
      )}

      {step === 3 && (
        <RegisterPage
          onNext={nextStep}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      {step === 4 && (
        <CreatePasswordStep
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
    </>
  );
}