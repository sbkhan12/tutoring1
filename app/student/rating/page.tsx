"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { StudentSidebar } from "@/components/student-sidebar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Sample data
const ratings = [
  { id: 1, tutor: "John Smith", date: "Jan 10, 2023", rating: 5, comment: "Helped me improve my grades!" },
  { id: 2, tutor: "John Smith", date: "Dec 15, 2022", rating: 5, comment: "Excellent at explaining complex topics." },
  { id: 3, tutor: "John Smith", date: "Nov 20, 2022", rating: 5, comment: "Very patient and knowledgeable." },
]

export default function ViewRatings() {
  const router = useRouter()

  const handleRateNewTutor = () => {
    router.push("/student/ratings")
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <StudentSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Dashboard content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Ratings & Reviews</h1>
            </div>

            {/* Ratings & Reviews section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
                {/* <Button variant="outline" size="sm" className="text-xs" onClick={handleRateNewTutor}>
                  Rate a New Tutor
                </Button> */}
              </div>

              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Star className="text-yellow-400" />
                      </div>
                      <div>
                        <div className="font-medium">{rating.tutor}</div>
                        <div className="text-xs text-gray-500">{rating.date}</div>
                      </div>
                    </div>
                    <div className="flex mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{rating.comment}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 mt-1"
                      onClick={() => router.push(`/student/ratings/${rating.id}`)}
                    >
                      Give Review
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}