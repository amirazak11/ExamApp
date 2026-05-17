type StepItem = {
  id: number;
  title: string;
  subtitle: string;
};

type StepperHeaderProps = {
  steps: StepItem[];
  currentStep: number;
};

export function StepperHeader({ steps, currentStep }: StepperHeaderProps) {
  return (
    <div className="mb-8 flex w-full items-center">
      {steps.map((stepItem, index) => {
        const isActive = currentStep === stepItem.id;
        const isCompleted = currentStep > stepItem.id;
        const isLast = index === steps.length - 1;

        return (
          <div key={stepItem.id} className="flex flex-1 items-center last:flex-none">
            <div
              className={[
                "shrink-0 rotate-45 transition-all",
                isActive
                  ? "size-6 border-4 border-blue-100 bg-blue-600"
                  : isCompleted
                  ? "size-4 bg-blue-600"
                  : "size-4 border border-blue-600 bg-blue-100",
              ].join(" ")}
            />

            {!isLast && (
              <div
                className={[
                  "mx-2 h-0 flex-1 border-t border-blue-600",
                  isCompleted ? "border-solid" : "border-dashed",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}