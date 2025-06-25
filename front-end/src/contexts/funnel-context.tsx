"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for funnel data
interface FunnelData {
  [stepNumber: number]: string | { [key: string]: string };
}

// Define the context type
interface FunnelContextType {
  funnelData: FunnelData;
  updateStepData: (
    step: number,
    data: string | { [key: string]: string }
  ) => void;
  getStepData: (step: number) => string | { [key: string]: string } | undefined;
  clearFunnelData: () => void;
  getAllFunnelData: () => FunnelData;
}

// Create the context
const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

// Provider component
interface FunnelProviderProps {
  children: ReactNode;
}

export const FunnelProvider: React.FC<FunnelProviderProps> = ({ children }) => {
  const [funnelData, setFunnelData] = useState<FunnelData>({});

  const updateStepData = (
    step: number,
    data: string | { [key: string]: string }
  ) => {
    setFunnelData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const getStepData = (step: number) => {
    return funnelData[step];
  };

  const clearFunnelData = () => {
    setFunnelData({});
  };

  const getAllFunnelData = () => {
    return funnelData;
  };

  const value: FunnelContextType = {
    funnelData,
    updateStepData,
    getStepData,
    clearFunnelData,
    getAllFunnelData,
  };

  return (
    <FunnelContext.Provider value={value}>{children}</FunnelContext.Provider>
  );
};

// Custom hook to use the funnel context
export const useFunnel = (): FunnelContextType => {
  const context = useContext(FunnelContext);
  if (context === undefined) {
    throw new Error("useFunnel must be used within a FunnelProvider");
  }
  return context;
};
