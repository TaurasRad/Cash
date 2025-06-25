// types/funnel.ts
import { FunnelStepData } from "@/app/funnel/components/funnel/types";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: {
        page_title?: string;
        page_location?: string;
        custom_parameter_1?: string;
        step?: number;
        selection?: string;
        funnel_name?: string;
        event_category?: string;
        event_label?: string;
        page_path?: string;
      }
    ) => void;
  }
}

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";

interface FunnelStepProps {
  stepData: FunnelStepData;
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  onNext: (data: string | { [key: string]: string }) => void;
  onBack: () => void;
  stepFunnelData: string | { [key: string]: string };
  handleUserInput?: (data: string | { [key: string]: string }) => void;
}

const FunnelStep: React.FC<FunnelStepProps> = ({
  stepData,
  currentStep,
  totalSteps,
  isLoading,
  onNext,
  onBack,
  stepFunnelData,
  handleUserInput,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [urlInputValue, setUrlInputValue] = useState<string>("");
  const [showNoInputMessage, setShowNoInputMessage] = useState<boolean>(false);

  // Analytics tracking functions with proper typing
  const trackFunnelView = (step: number): void => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "page_view", {
        page_title: `Funnel Step ${step}`,
        page_location: window.location.href,
        custom_parameter_1: "funnel_step_" + step,
      });

      window.gtag("event", "funnel_step_view", {
        step: step,
        funnel_name: "website_optimization",
        event_category: "Funnel",
        event_label: `Step ${step} View`,
      });
    }
  };

  // Monitor URL input changes for real-time validation
  useEffect(() => {
    if (currentStep === totalSteps && stepData.type === "component") {
      const urlInput = document.querySelector(
        'input[type="url"]'
      ) as HTMLInputElement;
      if (urlInput) {
        const handleInputChange = () => {
          setUrlInputValue(urlInput.value);
        };

        urlInput.addEventListener("input", handleInputChange);
        return () => urlInput.removeEventListener("input", handleInputChange);
      }
    }
  }, [currentStep, totalSteps, stepData.type]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        stepData.type === "options" &&
        typeof stepFunnelData === "string" &&
        stepFunnelData
      ) {
        setSelectedOption(stepFunnelData);
      } else {
        setSelectedOption("");
      }

      // Track page view for analytics
      trackFunnelView(currentStep);
    }
  }, [currentStep, stepFunnelData, stepData.type]);

  const trackFunnelProgress = (
    step: number,
    selection: string | { [key: string]: string }
  ): void => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "funnel_step_complete", {
        step: step,
        selection: JSON.stringify(selection),
        funnel_name: "website_optimization",
        event_category: "Funnel",
        event_label: `Step ${step} Complete`,
      });
    }
  };

  const handleOptionSelect = async (option: string): Promise<void> => {
    setSelectedOption(option);

    // Immediately proceed to next step for options
    if (stepData.type === "options") {
      // Track the completion of current step
      trackFunnelProgress(currentStep, option);
      onNext(option);
    }
  };

  const onNextFromComponent = (data: string | { [key: string]: string }) => {
    trackFunnelProgress(currentStep, data);
    onNext(data);
  };

  const handleContinueClick = () => {
    if (stepData.type === "component") {
      // Get the current input from the DOM for URL validation
      const urlInput = document.querySelector(
        'input[type="url"]'
      ) as HTMLInputElement;
      const currentUrl = urlInput ? urlInput.value.trim() : "";

      // Use the URL from input or fallback to stepFunnelData
      const dataToSend =
        currentUrl ||
        (typeof stepFunnelData === "string" ? stepFunnelData : "");

      // Check if this step requires input and no input is provided
      if (stepData.input === true && !dataToSend) {
        // Show message instead of preventing action
        setShowNoInputMessage(true);
        // Hide message after 3 seconds
        setTimeout(() => setShowNoInputMessage(false), 3000);
        return;
      }

      // Clear any existing message
      setShowNoInputMessage(false);

      console.log("dataToSend", dataToSend);
      handleUserInput && handleUserInput(dataToSend);
      onNextFromComponent(dataToSend);
    }
  };

  const handleBack = async (): Promise<void> => {
    onBack();
  };

  if (!stepData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Loading step...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern bg-grid-size">
      {stepData.header !== false && (
        <>
          <div className=" ">
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="relative flex items-center justify-center">
                {/* Left side - Back arrow */}
                <div className="absolute left-0">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      disabled={isLoading}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                    >
                      <ChevronLeft className="w-6 h-6 text-red-500" />
                    </button>
                  )}
                </div>

                {/* Logo - centered */}
                <div className="text-xl md:text-2xl font-bold">
                  <span className="text-red-500">Grow</span>
                  <span className="text-gray-800">tha</span>
                </div>

                {/* Right side - Step counter */}
                <div className="absolute right-0 text-lg font-medium text-gray-600">
                  {currentStep}/{totalSteps}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="max-w-2xl mx-auto px-4 pb-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          stepData.type === "component" ? "" : "justify-center items-center"
        }`}
      >
        <div
          className={`w-full max-w-2xl mx-auto ${
            stepData.type === "component" ? "mt-4 md:mt-8" : ""
          }`}
        >
          {stepData.title && (
            <div className="rounded-lg p-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {stepData.title}
              </h2>
              {stepData.subtitle && (
                <p className="text-gray-500 text-md mb-4 text-center">
                  {stepData.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className={`w-full max-w-2xl mx-auto ${
            stepData.type === "component"
              ? "flex-1 flex items-center justify-center"
              : ""
          }`}
        >
          <div>
            {stepData.type === "options" && (
              <div className="space-y-4 p-2">
                {stepData.options?.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedOption === option
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {selectedOption === option && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {stepData.type === "component" &&
              stepData.component &&
              React.createElement(stepData.component, {
                onNext: onNextFromComponent,
                savedData: stepFunnelData,
                isLoading,
              })}
          </div>
        </div>

        {stepData.type === "component" && (
          <div className="flex flex-col items-center bg-white w-full py-4">
            {showNoInputMessage && (
              <div className="mb-2 text-red-500 text-sm text-center">
                Please enter your website URL to continue
              </div>
            )}
            <button
              onClick={handleContinueClick}
              className="bg-[#FF7451] text-white px-4 py-2 rounded-md w-[90%] max-w-xs hover:bg-[#E85A3B] transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelStep;
