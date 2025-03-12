import { useState } from "react"
import { Logo } from "@/components/logo"
import { Search, Bell } from "lucide-react"

export function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev)
  }

  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev)
  }

  return (
    <header className="flex items-center justify-between p-4  rounded-t-lg">
      <Logo />
      <div className="flex items-center gap-4">
        <button className="text-gray-600" onClick={handleSearchClick}>
          <Search size={20} />
        </button>
        <button className="text-gray-600" onClick={handleNotificationClick}>
          <Bell size={20} />
        </button>
      </div>
      {showSearch && (
        <div className="absolute top-16 left-15 right-12 bg-white p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
      {showNotifications && (
        <div className="absolute top-16 right-4 bg-white p-4 shadow-md rounded-md">
          <p>No new notifications</p>
        </div>
      )}
    </header>
  )
}