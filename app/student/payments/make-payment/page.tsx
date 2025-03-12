"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { Search, Bell, CreditCard, ChevronRight } from "lucide-react"
import { StudentSidebar } from "@/components/student-sidebar"

export default function MakePayment() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the payment here
    router.push("/student")
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <div className="flex flex-1">
        <StudentSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
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

          {/* Payment content */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-4">Payment Setup</h1>
            <p className="text-gray-600 mb-6">
              Here is secure payment for your tutoring session. Tutors are paid per session, and you'll only be charged
              for the sessions you book.
            </p>

            <div className="flex gap-2 mb-6">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  paymentMethod === "card" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="inline-block mr-2 h-4 w-4" />
                Credit Card Payment
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  paymentMethod === "bank" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                Transfer by thousands
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Payment form */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Setup</h2>

                {paymentMethod === "card" ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <Input
                          id="cardholderName"
                          name="cardholderName"
                          value={cardData.cardholderName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={cardData.cardNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <Input id="cvv" name="cvv" value={cardData.cvv} onChange={handleChange} required />
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Button variant="outline" className="flex items-center gap-2">
                      Link Bank Account <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">Or</p>
                  <Button variant="outline" className="flex items-center gap-2 mx-auto">
                    Link Bank Account <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Payment summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Next Billing Date:</span>
                    <span className="font-medium">January 25, 2023</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-semibold">$30</span>
                  </div>

                  <Button onClick={handleSubmit} className="w-full mt-4">
                    Confirm & Pay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

