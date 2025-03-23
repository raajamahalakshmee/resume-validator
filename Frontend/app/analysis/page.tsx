"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"

// Mock analysis data
const mockAnalysisData = {
  overallScore: 87,
  sections: [
    { name: "Experience", score: 92, feedback: "Strong relevant experience with clear accomplishments." },
    { name: "Skills", score: 85, feedback: "Good technical skills, but could use more industry-specific keywords." },
    { name: "Education", score: 90, feedback: "Relevant education with appropriate details." },
    { name: "Format", score: 78, feedback: "Layout is clean but could improve readability with better spacing." },
    { name: "Keywords", score: 88, feedback: "Good use of industry keywords, but missing some trending terms." },
  ],
  recommendations: [
    "Add more quantifiable achievements to your experience section",
    "Include more industry-specific keywords like 'blockchain', 'smart contracts'",
    "Improve formatting with better section spacing",
    "Consider adding a brief professional summary at the top",
  ],
  strengths: [
    "Clear demonstration of technical skills",
    "Strong educational background",
    "Well-structured work experience",
    "Good use of action verbs",
  ],
}

export default function AnalysisPage() {
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(true)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState("Experience")
  const [analysisData, setAnalysisData] = useState<any>(null)

  useEffect(() => {
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          return 100
        }

        // Update current section being analyzed
        if (prev < 20) setCurrentSection("Experience")
        else if (prev < 40) setCurrentSection("Skills")
        else if (prev < 60) setCurrentSection("Education")
        else if (prev < 80) setCurrentSection("Format")
        else setCurrentSection("Keywords")

        return prev + 2
      })
    }, 100)

    // Simulate analysis completion
    setTimeout(() => {
      clearInterval(interval)
      setAnalysisProgress(100)
      setAnalyzing(false)
      setAnalysisData(mockAnalysisData)
      setLoading(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (analyzing) {
    return (
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI Analysis</h1>
          <p className="text-muted-foreground mb-8">
            Our AI is analyzing your resume for optimal job market performance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Analyzing Resume</CardTitle>
              <CardDescription>Please wait while our AI analyzes your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing {currentSection}...</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Experience", "Skills", "Education", "Format", "Keywords"].map((section) => (
                  <div
                    key={section}
                    className={`p-4 rounded-lg border ${
                      currentSection === section
                        ? "border-primary bg-primary/5"
                        : analysisProgress >
                            ["Experience", "Skills", "Education", "Format", "Keywords"].indexOf(section) * 20
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {analysisProgress >
                      ["Experience", "Skills", "Education", "Format", "Keywords"].indexOf(section) * 20 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div
                          className={`h-4 w-4 rounded-full ${
                            currentSection === section ? "bg-primary animate-pulse" : "bg-muted"
                          }`}
                        />
                      )}
                      <span className="text-sm font-medium">{section}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center p-4 text-center text-sm text-muted-foreground">
                <p>
                  This may take a few moments. Our AI is thoroughly analyzing your resume against industry standards.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Analysis Results</h1>
        <p className="text-muted-foreground mb-8">Review the AI-powered analysis of your resume</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Resume Score</CardTitle>
              <CardDescription>Overall assessment of your resume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisData?.overallScore / 100)}`}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{analysisData?.overallScore}</span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                    {analysisData?.overallScore >= 90
                      ? "Excellent"
                      : analysisData?.overallScore >= 80
                        ? "Very Good"
                        : analysisData?.overallScore >= 70
                          ? "Good"
                          : analysisData?.overallScore >= 60
                            ? "Fair"
                            : "Needs Improvement"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Section Scores</h3>
                {analysisData?.sections.map((section: any) => (
                  <div key={section.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{section.name}</span>
                      <span className={`text-sm font-medium ${getScoreColor(section.score)}`}>{section.score}/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`${getScoreBg(section.score)} h-2 rounded-full`}
                        style={{ width: `${section.score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{section.feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Blockchain Verification</CardTitle>
              <CardDescription>Resume validation on Ethereum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-500">Verified on Blockchain</h4>
                  <p className="text-sm text-muted-foreground">
                    Your resume has been verified and stored on the Ethereum blockchain
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Verification Details</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span>Ethereum</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Block</span>
                    <span>#16482930</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp</span>
                    <span>2 minutes ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Confirmed
                    </Badge>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Tabs defaultValue="recommendations">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="actions">Next Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Improvement Recommendations</CardTitle>
                <CardDescription>AI-powered suggestions to enhance your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData?.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strengths" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Resume Strengths</CardTitle>
                <CardDescription>Areas where your resume performs well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData?.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Steps to take based on your analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                    <Download className="h-4 w-4" />
                    Download Analysis Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Analysis Results
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-500 mb-2">Next Steps</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <span>Update your resume with the recommended improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <span>Re-upload your resume for a new analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <span>Mint your verified resume as an NFT for sharing</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="default">View Job Matches</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

