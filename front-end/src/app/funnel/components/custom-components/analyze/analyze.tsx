"use client";

import { useState, useEffect } from "react";
import AnalysisProgress from "./analysis-progress";
import type { Review } from "./reviews-carousel"; // Import the Review type

const analysisSteps = [
  "Scanning your website structure...",
  "Identifying conversion-critical pages...",
  "Auditing page speed & mobile responsiveness...",
  "Analyzing copy & messaging clarity...",
  "Generating personalized growth recommendations...",
];

const reviewsData: Review[] = [
  {
    id: "1",
    name: "John M.",
    rating: 5,
    title: "Worth every peny",
    text: "Been struggling to increase conversion rate for my web for a while, this worked wonders! Finally ads are profitable..",
  },
  {
    id: "2",
    name: "Sarah L.",
    rating: 5,
    title: "Game Changer!",
    text: "The insights provided were incredibly detailed and actionable. Our sales have visibly improved since implementing the suggestions.",
  },
  {
    id: "3",
    name: "Mike B.",
    rating: 4,
    title: "Very Helpful",
    text: "Good recommendations, though some were a bit complex to implement for our small team. Overall, a positive impact.",
  },
  {
    id: "4",
    name: "Linda K.",
    rating: 5,
    title: "Exceeded Expectations",
    text: "I was skeptical at first, but Growtha delivered. The personalized plan was spot on. Highly recommend!",
  },
  {
    id: "5",
    name: "David P.",
    rating: 5,
    title: "Impressive Analysis",
    text: "The depth of the analysis was impressive. Found several key areas for improvement we hadn't considered. Great tool!",
  },
];

export default function Analyze() {
  const [progress, setProgress] = useState(0);
  const [completedChecks, setCompletedChecks] = useState<boolean[]>(
    new Array(analysisSteps.length).fill(false)
  );

  const totalSteps = analysisSteps.length;
  const stepDuration = 1500; // ms per step

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const totalDuration = totalSteps * stepDuration;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / totalDuration, 1);

      // Smooth progress from 15% to 100%
      const smoothProgress = 15 + progressRatio * 85;
      setProgress(smoothProgress);

      // Check which steps should be completed based on elapsed time
      const currentStepIndex = Math.floor(elapsed / stepDuration);
      setCompletedChecks((prev) => {
        const newChecks = [...prev];
        for (let i = 0; i <= Math.min(currentStepIndex, totalSteps - 1); i++) {
          newChecks[i] = true;
        }
        return newChecks;
      });

      if (progressRatio < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [totalSteps, stepDuration]);

  return (
    <div className="h-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnalysisProgress
          progress={progress}
          steps={analysisSteps}
          completedChecks={completedChecks}
          reviews={reviewsData}
        />
      </div>
    </div>
  );
}
