"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"

export default function QuizResults() {
  const router = useRouter()
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore")
    if (savedScore) {
      setScore(Number.parseInt(savedScore))
    }
  }, [])

  const handleReturnToDashboard = () => {
    router.push("/login")
  }

  return (
    <AuthLayout title="Quiz Completed!" showProgress={false}>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-gray-600 mb-4">Your Score: {score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${score}%` }}></div>
          </div>
          <Button onClick={handleReturnToDashboard} className="rounded-full px-6">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

