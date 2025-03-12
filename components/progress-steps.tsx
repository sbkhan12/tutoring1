interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8 px-4">
      {/* Background line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-blue-100" />

      {/* Progress line */}
      <div
        className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-blue-500 transition-all duration-300"
        style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-center w-8 h-8 rounded-full 
              text-sm font-medium transition-colors
              ${index <= currentStep ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"}
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

