import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-30 w-30">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fDdfC0n8p0EyTbGMwYtwLQKFj2KPw1.png"
          alt="Tutoring Anything Logo"
          width={110}
          height={110}
          className="object-contain"
        />
      </div>
      {/* <span className="font-semibold text-blue-600 text-lg tracking-tight">TUTORING ANYTHING</span> */}
    </Link>
  )
}

