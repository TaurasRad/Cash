"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Website Optimizer
          </h1>
          <p className="text-gray-600">Transform your website instantly</p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0 md:p-0">
            <div className="grid md:grid-cols-2">
              {/* Left Column: Inputs and Checkout */}
              <div className="p-6 md:p-8 flex flex-col md:justify-between h-full min-h-[500px]">
                <div className="flex-1 flex flex-col space-y-6">
                  {/* Website Input */}
                  {!analysisComplete && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <label
                          htmlFor="website"
                          className="text-lg font-medium text-gray-800"
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
                          className="h-12"
                          disabled={isAnalyzing}
                        />
                        {!isAnalyzing && !analysisComplete && (
                          <Button
                            onClick={handleStartAnalysis}
                            className="h-12 px-6 w-[100px] rounded-[10px]"
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
                          className="text-lg font-medium text-gray-800"
                        >
                          Enter Your Email
                        </label>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="h-12"
                        />
                        <Button
                          onClick={handleProceed}
                          className="h-12 px-6"
                          disabled={!email}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Checkout Top: What you'll get */}
                  {showCheckout && (
                    <div className="block md:static md:mb-6 animate-fadeIn">
                      <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                        <h3 className="font-semibold text-blue-900">
                          What you'll get:
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
                      className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
              <div className="relative min-h-[320px] md:min-h-[650px] bg-gray-50 md:border-l border-gray-200 overflow-hidden">
                {/* Website Preview Background */}
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  {screenshotLoading ? (
                    <div className="text-center text-gray-400 animate-pulse">
                      <Globe className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                      <p>Loading the website...</p>
                    </div>
                  ) : screenshot ? (
                    <div className="relative w-full h-[400px] md:h-[650px] overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={screenshot}
                        alt="Website screenshot"
                        className="object-top object-cover w-full h-full"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      />
                      {/* Optional: Fade at the bottom */}
                      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
                    </div>
                  ) : screenshotError ? (
                    <div className="text-center text-red-500">
                      <Globe className="w-16 h-16 text-red-300 mx-auto mb-2" />
                      <p>Screenshot failed: {screenshotError}</p>
                    </div>
                  ) : analysisComplete && email ? (
                    <div className="text-center opacity-30">
                      <Mail className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-500">{email}</p>
                    </div>
                  ) : websiteUrl ? (
                    <div className="text-center opacity-30">
                      <Globe className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">{websiteUrl}</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <Globe className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                      <p>Enter a URL to see preview</p>
                    </div>
                  )}
                </div>

                {/* Analysis Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    {/* Analysis Progress Bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center space-x-2">
                      <Progress
                        value={analysisProgress}
                        className="h-2 flex-grow"
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {Math.round(analysisProgress)}%
                      </span>
                    </div>

                    {/* Analysis Steps Indicators */}
                    {analysisSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`absolute transition-all duration-500 ease-in-out ${
                          index <= currentAnalysisStep
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                        }`}
                        style={{
                          top: step.position.top,
                          left: step.position.left,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                          <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                            {step.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {step.text}
                          </span>
                          {index < currentAnalysisStep && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Scanning Effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-blue-400/0 via-blue-400/10 to-blue-400/0"
                      style={{
                        animation: "scanMove 2s linear infinite",
                        backgroundSize: "100% 10px",
                      }}
                    ></div>
                  </div>
                )}

                {/* Locked Overlay (when analysis is complete) */}
                {analysisComplete && !showCheckout && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4">
                    <div className="text-center text-white bg-black/50 backdrop-blur-sm p-6 rounded-lg">
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 px-4 py-2 mb-4"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Analysis Complete!
                      </Badge>
                      <p className="font-medium text-lg text-white">
                        Your optimized website is ready
                      </p>
                      <p className="text-sm opacity-90 mb-4 text-white">
                        Enter your email on the left to continue
                      </p>
                    </div>
                  </div>
                )}

                {/* Checkout Overlay */}
                {showCheckout && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="text-center text-white">
                      <Lock className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-medium text-white">Locked Preview</p>
                      <p className="text-sm opacity-90 text-white">
                        Complete checkout on the left to unlock
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
