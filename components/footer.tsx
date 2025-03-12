import Link from "next/link"

export function Footer() {
  return (
    <footer className="text-center text-xs text-gray-500 py-4 mt-auto">
      <div className="flex justify-center gap-2">
        <Link href="/contact" className="hover:underline">
          Contact Us
        </Link>
        <span>|</span>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <span>|</span>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}

