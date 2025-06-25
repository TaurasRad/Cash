"use client";

import { useState } from "react";
import { useFunnel } from "@/contexts/funnel-context";

interface LastStepProps {
  onNext?: (data: string | { [key: string]: string }) => void;
  savedData?: string | { [key: string]: string };
  isLoading?: boolean;
}

export default function LastStep({ onNext, savedData }: LastStepProps) {
  const { updateStepData } = useFunnel();
  const [url, setUrl] = useState(() => {
    // Initialize with saved data if available
    if (typeof savedData === "string") return savedData;
    if (typeof savedData === "object" && savedData?.url) return savedData.url;
    return "";
  });

  const handleContinue = () => {
    if (url.trim()) {
      // Store in funnel context
      updateStepData(12, url.trim()); // Assuming this is step 12 based on the file structure

      // Call onNext to proceed to next step
      if (onNext) {
        onNext(url.trim());
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center px-4 py-2">
      <div className="w-full max-w-2xl mx-auto flex flex-col min-h-0 space-y-4 md:space-y-6 pt-4 md:pt-8">
        {/* Header */}
        <div className="text-center space-y-2 md:space-y-4 flex-shrink-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-400">
            Last step!
          </h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
            Time for Growtha to analyze your website
          </h2>
        </div>

        {/* URL Input */}
        <div className="w-full flex-shrink-0">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Input your website url..."
            className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleContinue();
              }
            }}
          />
        </div>

        {/* Graph Image - Responsive and constrained */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <img
            src="/funnel/graph.png"
            alt="graph"
            className="w-full max-w-2xl h-auto max-h-64 md:max-h-80 object-contain"
          />
        </div>

        {/* Bottom Text */}
        <div className="text-center flex-shrink-0">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            * On average our clients see{" "}
            <span className="font-bold text-black">328%</span> increase in
            results in the first month of trying Growtha
          </p>
        </div>
      </div>
    </div>
  );
}
