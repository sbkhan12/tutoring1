"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function UploadDocuments() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files)
      setFiles(fileArray)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setFiles(fileArray)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store file names in localStorage
    localStorage.setItem("uploadedFiles", JSON.stringify(files.map((f) => f.name)))
    router.push("/register/quiz")
  }

  return (
    <AuthLayout
      title="Education Proof Upload"
      subtitle="Upload your educational certificates and documents"
      currentStep={1}
      stepTitle="Tutor Registration (Step 2)"
    >
      <div className="space-y-4">
        <ul className="list-disc pl-5 text-sm text-gray-600 mb-6">
          <li>Diploma or Degree Certificate</li>
          <li>Teaching License</li>
          <li>Other relevant documents</li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium">Drag & Drop your file here or Browse</p>
              <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
              {files.length > 0 && (
                <div className="mt-4 text-left w-full">
                  <p className="text-sm font-medium text-gray-700">Selected files:</p>
                  <ul className="text-xs text-gray-600">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <Button type="submit" className="w-24 rounded-full">
              Next
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

