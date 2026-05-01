import { Progress } from "@/components/ui/progress"
import { useState } from "react"

type StepItem = {
  id: number
  title: string
  subtitle: string
}

type StepperHeaderProps = {
  steps: StepItem[]
  currentStep: number
  progressValue: number
}

export function StepperHeader({
  steps,
  currentStep,
  progressValue,
}: StepperHeaderProps) {
    const [step, setStep] = useState(1)
  return (
      <div className="flex items-center justify-between">
        {steps.map((stepItem, index) => {
          const isActive = currentStep === stepItem.id
          const isCompleted = currentStep > stepItem.id

          return (
            <div key={stepItem.id} className="flex flex-1 items-center">
              <div className="flex items-center gap-2">
                <div
                  className={[
                    "flex size-4 items-center justify-center rotate-45  rounded-none  text-sm font-semibold transition ",
                    isCompleted
                      ? " bg-blue-600"
                      : isActive
                      ? "border-blue-100 bg-blue-600 border-5 size-6"
                      : "border-blue-600 border bg-blue-100 ",
                  ].join(" ")}
                >
               
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={[
                    " border border-blue-600 flex-1 ",
                    currentStep > stepItem.id ? "" : "border-dashed",
                  ].join(" ")}
                />
              )}
            </div>
          )
        })}
      </div>
  )
}