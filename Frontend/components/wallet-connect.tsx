"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [network, setNetwork] = useState("Ethereum")

  const connectWallet = async () => {
    // Mock wallet connection
    try {
      // In a real app, this would use ethers.js or web3.js to connect
      setAddress("0x1234...5678")
      setConnected(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress("")
  }

  const switchNetwork = (network: string) => {
    setNetwork(network)
  }

  if (!connected) {
    return (
      <Button
        onClick={connectWallet}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Connected</span>
        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium">Active</span>
      </div>

      <div className="p-2 rounded-md bg-muted text-sm font-mono truncate">{address}</div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              {network}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => switchNetwork("Ethereum")}>Ethereum</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchNetwork("Polygon")}>Polygon</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchNetwork("Optimism")}>Optimism</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="destructive" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    </div>
  )
}

