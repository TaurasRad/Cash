import React from "react";
import { Globe, Mail, Lock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalysisStep {
  icon: React.ReactNode;
  text: string;
  position: { top: string; left: string };
}

interface WebsitePreviewProps {
  websiteUrl: string;
  email: string;
  screenshot: string | null;
  screenshotLoading: boolean;
  screenshotError: string | null;
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisSteps: AnalysisStep[];
  currentAnalysisStep: number;
  analysisComplete: boolean;
  showCheckout: boolean;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  websiteUrl,
  email,
  screenshot,
  screenshotLoading,
  screenshotError,
  isAnalyzing,
  analysisProgress,
  analysisSteps,
  currentAnalysisStep,
  analysisComplete,
  showCheckout,
}) => {
  return (
    <div className="relative min-h-[320px] md:min-h-[650px] bg-white md:border-l border-gray-200 overflow-hidden">
      {/* Website Preview Background */}
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        {screenshotLoading ? (
          <div className="text-center text-blue-600 animate-pulse">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-2" />
            <p>Loading the website...</p>
          </div>
        ) : screenshot ? (
          <div className="relative w-full h-[400px] md:h-[650px] overflow-hidden rounded-lg shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshot}
              alt="Website screenshot"
              className="object-top object-cover w-full h-full"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
            {/* Optional: Fade at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
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
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-500">{websiteUrl}</p>
          </div>
        ) : (
          <div className="text-center text-blue-400">
            <Globe className="w-16 h-16 text-blue-300 mx-auto mb-2" />
            <p>Enter a URL to see preview</p>
          </div>
        )}
      </div>

      {/* Analysis Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          {/* Mobile: Stack steps vertically and centered, not at top or bottom */}
          <div className="block md:hidden absolute left-1/2 top-[10%] w-full max-w-xs -translate-x-1/2 z-10">
            <div className="flex flex-col items-center space-y-4">
              {analysisSteps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-in-out w-full flex justify-center ${
                    index <= currentAnalysisStep
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
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
            </div>
          </div>
          {/* Desktop: Keep absolute positioning */}
          <div className="hidden md:block">
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
          </div>
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
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="text-center text-white bg-black/60 backdrop-blur-sm p-6 rounded-lg">
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
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
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
  );
};

export default WebsitePreview;
