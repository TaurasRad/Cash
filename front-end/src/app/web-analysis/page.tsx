"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Globe,
  Mail,
  Lock,
  Shield,
  Search,
  Zap,
  LineChart,
  Layers,
  Code,
} from "lucide-react";
import WebsitePreview from "./components/WebsitePreview";

export default function WebsiteAnalyzer() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);

  const analysisSteps = [
    {
      icon: <Search className="w-5 h-5" />,
      text: "Analyzing competitors...",
      position: { top: "20%", left: "30%" },
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      text: "Looking for best SEO practices...",
      position: { top: "40%", left: "60%" },
    },
    {
      icon: <Layers className="w-5 h-5" />,
      text: "Updating interface...",
      position: { top: "60%", left: "25%" },
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Making it look nice...",
      position: { top: "30%", left: "70%" },
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: "Finalizing...",
      position: { top: "70%", left: "50%" },
    },
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const totalDuration = 12000; // 12 seconds for full progress
      const progressIntervalMs = 50;
      const stepsCount = analysisSteps.length;
      const stepDuration = totalDuration / stepsCount;
      let startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / totalDuration) * 100, 100);
        setAnalysisProgress(progress);
        // Sync steps with progress
        const step = Math.min(
          Math.floor((elapsed / totalDuration) * stepsCount),
          stepsCount - 1
        );
        setCurrentAnalysisStep(step);
        if (progress >= 100) {
          clearInterval(interval);
          setAnalysisComplete(true);
          setIsAnalyzing(false);
        }
      }, progressIntervalMs);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isAnalyzing, analysisSteps.length]);

  const handleStartAnalysis = async () => {
    if (websiteUrl) {
      setScreenshot(null);
      setScreenshotError(null);
      setScreenshotLoading(true);
      try {
        const res = await fetch("/api/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: websiteUrl }),
        });
        const data = await res.json();
        if (res.ok && data.image) {
          setScreenshot(data.image);
          setIsAnalyzing(true);
        } else {
          setScreenshotError(data.error || "Failed to get screenshot");
        }
      } catch (err: any) {
        setScreenshotError(err.message || "Failed to get screenshot");
      } finally {
        setScreenshotLoading(false);
      }
    }
  };

  const handleProceed = () => {
    if (email) {
      setShowCheckout(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Website Optimizer
          </h1>
          <p className="text-gray-300">Transform your website instantly</p>
        </div>

        <Card className="bg-white shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0 md:p-0">
            <div className="grid md:grid-cols-2">
              {/* Left Column: Inputs and Checkout */}
              <div className="p-4 flex flex-col h-full text-gray-900">
                <div className="flex flex-col space-y-4">
                  {/* Website Input */}
                  {!analysisComplete && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <label
                          htmlFor="website"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Enter Your Website
                        </label>
                      </div>
                      <div className="flex sm:flex-row flex-col gap-4">
                        <Input
                          type="url"
                          id="website"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                          disabled={isAnalyzing}
                        />
                        {!isAnalyzing && !analysisComplete && (
                          <Button
                            onClick={handleStartAnalysis}
                            className="h-12 px-6 w-[120px] rounded-full font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg shadow-lg transition-all duration-300"
                            disabled={!websiteUrl}
                          >
                            Analyze
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email Input (shows when analysis is complete) */}
                  {analysisComplete && !showCheckout && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <label
                          htmlFor="email"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Enter Your Email
                        </label>
                      </div>
                      <div className="flex flex-col gap-4">
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                        />
                        <Button
                          onClick={handleProceed}
                          className="h-12 w-fit rounded-full font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg shadow-lg transition-all duration-300"
                          disabled={!email}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Checkout Top: What you&apos;ll get */}
                  {showCheckout && (
                    <div className="block md:static md:mb-6 animate-fadeIn">
                      <div className="bg-blue-50 rounded-lg p-4 space-y-2 border border-blue-100">
                        <h3 className="font-semibold text-blue-900">
                          What you&apos;ll get:
                        </h3>
                        <ul className="space-y-1 text-sm text-blue-800">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Fully optimized website code</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>SEO improvements</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Performance enhancements</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Modern design updates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Checkout Bottom: Button and Guarantee */}
                {showCheckout && (
                  <div className="space-y-6 animate-fadeIn mt-4 md:mt-auto">
                    <Button
                      className="w-full h-12 text-lg font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transition-all duration-300"
                      onClick={async () => {
                        try {
                          const res = await fetch(
                            "/api/create-checkout-session",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email }),
                            }
                          );
                          const data = await res.json();
                          if (data.url) {
                            window.location.href = data.url;
                          } else {
                            alert("Failed to create checkout session.");
                          }
                        } catch (err) {
                          alert("Error creating checkout session.");
                        }
                      }}
                    >
                      Complete Checkout - $49
                    </Button>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4" />
                        <span>14-day money back guarantee</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Website Preview with Analysis Overlay */}
              <WebsitePreview
                websiteUrl={websiteUrl}
                email={email}
                screenshot={screenshot}
                screenshotLoading={screenshotLoading}
                screenshotError={screenshotError}
                isAnalyzing={isAnalyzing}
                analysisProgress={analysisProgress}
                analysisSteps={analysisSteps}
                currentAnalysisStep={currentAnalysisStep}
                analysisComplete={analysisComplete}
                showCheckout={showCheckout}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes scanMove {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
