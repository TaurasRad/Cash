"use client";

import FunnelStep from "@/app/funnel/components/funnel/funnel-step";
import { funnelSteps } from "@/app/funnel/components/funnel/funnel-steps";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFunnel } from "@/contexts/funnel-context";

export default function FunnelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateStepData, getStepData } = useFunnel();
  const currentStep = 3;
  const totalSteps = Object.keys(funnelSteps).length;
  const stepData = funnelSteps[currentStep];

  const handleNext = (data: string | { [key: string]: string }) => {
    setIsLoading(true);
    updateStepData(currentStep, data);
    const nextStep = currentStep + 1;
    if (nextStep > totalSteps) {
      router.push("/funnel/checkoutut");
    } else {
      router.push(`/funnel/step-${nextStep}`);
    }
    setIsLoading(false);
  };

  const handleBack = () => {
    const previousStep = currentStep - 1;
    if (previousStep > 0) {
      router.push(`/funnel/step-${previousStep}`);
    }
  };

  return (
    <FunnelStep
      stepData={stepData}
      currentStep={currentStep}
      totalSteps={totalSteps}
      isLoading={isLoading}
      stepFunnelData={getStepData(currentStep) || ""}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
}
