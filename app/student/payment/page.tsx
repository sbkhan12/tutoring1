"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { StudentSidebar } from "@/components/student-sidebar"
import { Button } from "@/components/ui/button"

// Sample data
const payments = [
  { id: 1, date: "Jan 5, 2023", amount: "$30.00", description: "Weekly Tutoring Session", status: "Paid" },
  { id: 2, date: "Dec 29, 2022", amount: "$30.00", description: "Weekly Tutoring Session", status: "Paid" },
  { id: 3, date: "Dec 22, 2022", amount: "$30.00", description: "Weekly Tutoring Session", status: "Active" },
]

export default function ViewPayments() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <StudentSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Dashboard content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Payment History</h1>
            </div>

            {/* Payment History section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Payment History</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b">
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-0">
                        <td className="py-3 text-sm">{payment.date}</td>
                        <td className="py-3 text-sm">{payment.amount}</td>
                        <td className="py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === "Paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-right">Next Billing Date: Feb 5, 2023</div>
              <div className="mt-4">
                <Button onClick={() => router.push("/student/payments/make-payment")}>Make a New Payment</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}