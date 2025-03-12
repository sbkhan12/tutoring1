import type React from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProgressSteps } from "@/components/progress-steps"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  currentStep?: number
  totalSteps?: number
  showProgress?: boolean
  stepTitle?: string
}

export function AuthLayout({
  children,
  title,
  subtitle,
  currentStep = 0,
  totalSteps = 3,
  showProgress = true,
  stepTitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {stepTitle && <h1 className="text-lg font-medium text-gray-700 mb-2">{stepTitle}</h1>}
        {showProgress && <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
              </div>
              {children}
            </div>
            <div className="md:w-2/5 bg-gray-100 relative">
              <Image
                src="https://www.brandempower.org/uploaded-files/category/images/thumbs/Education-Awards29.jpg"
                alt="Education"
                width={500}
                height={600}
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

