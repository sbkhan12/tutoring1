"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "@/components/footer"
import { Search, Bell, Star } from "lucide-react"

export default function RateTutor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")

  // Mock tutor data - in a real app, you would fetch this based on the ID
  const tutor = {
    id: params.id,
    name: "John Smith",
    subject: "Math Tutor",
    image: "/placeholder.svg?height=120&width=120",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this data to your backend
    console.log({ tutorId: params.id, rating, feedback })
    router.push("/student")
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <Logo />
        <div className="flex items-center gap-4">
          <button className="text-gray-600">
            <Search size={20} />
          </button>
          <button className="text-gray-600">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <Image
                src={tutor.image || "/placeholder.svg"}
                alt={tutor.name}
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{tutor.name}</h2>
            <p className="text-sm text-gray-500">{tutor.subject}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-1">Rate Your Experience</h3>
              <p className="text-sm text-gray-500 mb-3">Select a rating from 1-5 stars (5 is excellent)</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star
                      className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Feedback</h3>
              <Textarea
                placeholder="Type your comments here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="px-6 rounded-full">
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

