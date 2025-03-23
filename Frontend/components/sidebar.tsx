"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Upload,
  BarChart2,
  FileText,
  Shield,
  Award,
  Coins,
  AlertTriangle,
  Users,
  TimerIcon as Timeline,
  Lock,
  Image,
  Network,
  Briefcase,
  Globe,
  MessageSquare,
  GitBranch,
  User,
  Trophy,
  Code,
  PieChart,
  HelpCircle,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import WalletConnect from "@/components/wallet-connect"

const menuItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "AI Analysis", href: "/analysis", icon: BarChart2 },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Access Control", href: "/access", icon: Shield },
  { name: "Credentials", href: "/credentials", icon: Award },
  { name: "Tokens", href: "/tokens", icon: Coins },
  { name: "Fraud Detection", href: "/fraud", icon: AlertTriangle },
  { name: "Validators", href: "/validators", icon: Users },
  { name: "Career Timeline", href: "/timeline", icon: Timeline },
  { name: "Privacy", href: "/privacy", icon: Lock },
  { name: "Resume NFT", href: "/nft", icon: Image },
  { name: "Network", href: "/network", icon: Network },
  { name: "Matches", href: "/matches", icon: Briefcase },
  { name: "Multilingual", href: "/language", icon: Globe },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
  { name: "Versioning", href: "/versions", icon: GitBranch },
  { name: "Identity", href: "/identity", icon: User },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Developer", href: "/developer", icon: Code },
  { name: "Visualization", href: "/visualization", icon: PieChart },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold">Resume Validator</h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={closeSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4">
            <WalletConnect />
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 group",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border">
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="w-full flex items-center justify-center"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

