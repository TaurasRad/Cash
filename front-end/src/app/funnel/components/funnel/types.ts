import React from "react";

export type FunnelStepType = "options" | "input" | "info";

export interface FunnelInput {
  name: string;
  type: "text" | "email" | "url" | "tel";
  placeholder: string;
  label?: string;
}

export interface FunnelStepData {
  title?: string;
  type: "options" | "component";
  input?: boolean;
  options?: string[];
  subtitle?: string;
  header?: boolean;
  component?: React.ComponentType<{
    onNext: (data: string | { [key: string]: string }) => void;
    savedData: string | { [key: string]: string };
    isLoading: boolean;
  }>;
}

export interface FunnelData {
  [key: string]: string;
}

export interface FunnelSteps {
  [key: number]: FunnelStepData;
}
