"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, ExternalLink, Copy } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock data for resumes
const mockResumes = [
  {
    id: 1,
    title: "Software Engineer Resume",
    ipfsHash: "QmT8e9fG5XUVrEjEhJLdpYpDMfzd8oZqGmZKzuCxyGYQwL",
    score: 87,
    timestamp: "2024-03-15T14:30:00Z",
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
  },
  {
    id: 2,
    title: "Product Manager Resume",
    ipfsHash: "QmX9fG5XUVrEjEhJLdpYpDMfzd8oZqGmZKzuCxyGYQwL12",
    score: 92,
    timestamp: "2024-03-14T10:15:00Z",
    txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a",
  },
  {
    id: 3,
    title: "UX Designer Resume",
    ipfsHash: "QmZ8e9fG5XUVrEjEhJLdpYpDMfzd8oZqGmZKzuCxyGYQwL3",
    score: 78,
    timestamp: "2024-03-13T16:45:00Z",
    txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b",
  },
  {
    id: 4,
    title: "Data Scientist Resume",
    ipfsHash: "QmW7e9fG5XUVrEjEhJLdpYpDMfzd8oZqGmZKzuCxyGYQwL4",
    score: 95,
    timestamp: "2024-03-12T09:20:00Z",
    txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c",
  },
]

export default function Dashboard() {
  const [resumes, setResumes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResumes(mockResumes)
      setLoading(false)
    }, 1000)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and track your resume validations</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Submit New Resume
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Resumes</TabsTrigger>
          <TabsTrigger value="validated">Validated</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-16 bg-muted rounded w-full mt-4"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {resumes.map((resume) => (
                <motion.div key={resume.id} variants={item}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 border-t-primary">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{resume.title}</CardTitle>
                        <Badge variant={resume.score > 85 ? "default" : "secondary"}>Score: {resume.score}/100</Badge>
                      </div>
                      <CardDescription>Submitted on {formatDate(resume.timestamp)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-1">IPFS Hash</div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted p-1 rounded truncate flex-1">{resume.ipfsHash}</code>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(resume.ipfsHash)}
                              className="flex-shrink-0"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-1">Transaction</div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted p-1 rounded truncate flex-1">
                              {resume.txHash.substring(0, 18)}...
                            </code>
                            <Button variant="ghost" size="icon" className="flex-shrink-0" asChild>
                              <a
                                href={`https://etherscan.io/tx/${resume.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium mb-1">Validation Score</div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                              style={{ width: `${resume.score}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Poor</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/analysis?id=${resume.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Analysis
                        </Link>
                      </Button>
                      <Button variant="secondary" size="sm">
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
        <TabsContent value="validated">
          <div className="flex items-center justify-center h-40 border rounded-lg">
            <p className="text-muted-foreground">Filter by validated resumes</p>
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="flex items-center justify-center h-40 border rounded-lg">
            <p className="text-muted-foreground">Filter by pending resumes</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

