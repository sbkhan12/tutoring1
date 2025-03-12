"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the derivative of sin(x)?",
    options: [
      { id: "a", text: "sin(x)" },
      { id: "b", text: "cos(x)" },
      { id: "c", text: "-cos(x)" },
      { id: "d", text: "None of the above" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "What is the derivative of cos(x)?",
    options: [
      { id: "a", text: "cos(x)" },
      { id: "b", text: "sin(x)" },
      { id: "c", text: "-sin(x)" },
      { id: "d", text: "None of the above" },
    ],
    correctAnswer: "c",
  },
  {
    id: 3,
    question: "What is the derivative of tan(x)?",
    options: [
      { id: "a", text: "sec²(x)" },
      { id: "b", text: "cot(x)" },
      { id: "c", text: "-cot(x)" },
      { id: "d", text: "None of the above" },
    ],
    correctAnswer: "a",
  },
  {
    id: 4,
    question: "What is the derivative of e^x?",
    options: [
      { id: "a", text: "e^x" },
      { id: "b", text: "xe^(x-1)" },
      { id: "c", text: "ln(x)" },
      { id: "d", text: "None of the above" },
    ],
    correctAnswer: "a",
  },
  {
    id: 5,
    question: "What is the derivative of ln(x)?",
    options: [
      { id: "a", text: "1/x" },
      { id: "b", text: "x" },
      { id: "c", text: "ln(x)/x" },
      { id: "d", text: "None of the above" },
    ],
    correctAnswer: "a",
  },
]

export default function QuizQuestions() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [quizQuestions[currentQuestion].id]: value,
    })
  }

  const handleSubmit = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const correctAnswers = Object.keys(selectedAnswers).filter(
        (questionId) =>
          selectedAnswers[Number.parseInt(questionId)] ===
          quizQuestions.find((q) => q.id === Number.parseInt(questionId))?.correctAnswer,
      ).length

      const score = Math.round((correctAnswers / quizQuestions.length) * 100)

      // Store score in localStorage
      localStorage.setItem("quizScore", score.toString())

      // Navigate to results page
      router.push("/register/quiz/results")
    }
  }

  const question = quizQuestions[currentQuestion]

  return (
    <AuthLayout title={`Question ${currentQuestion + 1}`} showProgress={false} stepTitle="Tutor Registration (Step 3)">
      <div className="space-y-6">
        <div className="text-right text-sm text-gray-500">
          {currentQuestion + 1} out of {quizQuestions.length}
        </div>

        <div className="space-y-6">
          <div className="font-medium">{question.question}</div>

          <RadioGroup
            value={selectedAnswers[question.id] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="pt-4 flex justify-center">
          <Button onClick={handleSubmit} disabled={!selectedAnswers[question.id]} className="px-6">
            {currentQuestion < quizQuestions.length - 1 ? "Next" : "Submit"}
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

