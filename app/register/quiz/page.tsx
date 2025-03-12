"use client"

import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"

export default function QuizIntro() {
  const router = useRouter()

  const handleStartQuiz = () => {
    router.push("/register/quiz/questions")
  }

  return (
    <AuthLayout
      title="Tutor Quiz"
      subtitle="Please complete this short assessment to evaluate your expertise and skill"
      currentStep={2}
      stepTitle="Tutor Registration (Step 3)"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Guidelines:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• You have 30 minutes to complete the quiz</li>
            <li>• You must score 90% or higher to proceed</li>
            <li>• You cannot return to previous questions</li>
            <li>• Ensure you are in a quiet location</li>
          </ul>
        </div>
        <div className="pt-4">
          <Button onClick={handleStartQuiz} className="rounded-full px-6">
            Take Quiz
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

