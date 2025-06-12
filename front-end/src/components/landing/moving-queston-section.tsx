"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
// Using a custom styled div for badges instead of shadcn/ui Badge for more control here
// import { Badge } from "@/components/ui/badge";

const questionsRow1 = [
  { text: "Do I have to lower the price?", hasIcon: false },
  { text: "Do I add the price first or last?", hasIcon: true },
  { text: "Does my headline need to be short?", hasIcon: true },
  { text: "Should I A/B test colors?", hasIcon: true },
];

const questionsRow2 = [
  { text: 'Show full price? Or "Starting at..."?', hasIcon: false },
  { text: "Do I make new images?", hasIcon: true },
  { text: "Should I make the CTA blue?", hasIcon: true },
  { text: "Is my value proposition clear?", hasIcon: true },
];

const QuestionBadge = ({
  text,
  hasIcon,
}: {
  text: string;
  hasIcon: boolean;
}) => (
  <div
    className="mx-2 flex-shrink-0 cursor-default select-none items-center space-x-2 rounded-full 
               bg-white/10 backdrop-blur-sm border border-white/20 
               px-5 py-3 text-sm text-gray-100 shadow-lg 
               hover:bg-white/20 transition-colors duration-200"
  >
    {hasIcon && (
      <HelpCircle className="inline h-4 w-4 text-purple-300 mr-1.5 flex-shrink-0" />
    )}
    <span className="font-medium">{text}</span>
  </div>
);

const MarqueeRow = ({
  questions,
  direction = "left",
}: {
  questions: Array<{ text: string; hasIcon: boolean }>;
  direction?: "left" | "right";
}) => {
  const duplicatedQuestions = [...questions, ...questions];

  return (
    <motion.div
      className="flex"
      animate={{
        x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      }}
      transition={{
        ease: "linear",
        duration: 40, // Slightly slower for a more gentle effect
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {duplicatedQuestions.map((q, i) => (
        <QuestionBadge
          key={`${direction}-q-${i}`}
          text={q.text}
          hasIcon={q.hasIcon}
        />
      ))}
    </motion.div>
  );
};

export default function AnimatedQuestionsSection() {
  return (
    // Added my-12 sm:my-16 md:my-20 for consistent vertical spacing with other sections
    <div className="font-sans">
      <div className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#BCAAFE] via-[#8C73FF] to-[#5F40D9] text-gray-100 rounded-[70px] w-[70%] mx-auto">
        <div className="container mx-auto px-4 text-center w-full">
          {" "}
          {/* Increased max-width slightly */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-white w-[75%] mx-auto">
            Figuring out what to change takes a lot of
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 text-transparent bg-clip-text ml-2">
              time...
            </span>
          </h2>
          {/* overflow-x-hidden is important for the marquee container */}
          <div className="space-y-6 overflow-x-hidden">
            <div className="flex w-full">
              <MarqueeRow questions={questionsRow1} direction="left" />
            </div>
            <div className="flex w-full">
              <MarqueeRow questions={questionsRow2} direction="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
