import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import ReviewsCarousel from "./reviews-carousel";
import type { Review } from "./reviews-carousel";

interface AnalysisProgressProps {
  progress: number;
  steps: string[];
  completedChecks: boolean[];
  reviews: Review[];
}

export default function AnalysisProgress({
  progress,
  steps,
  completedChecks,
  reviews,
}: AnalysisProgressProps) {
  const displayProgress = Math.round(progress);

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto px-4">
      <div className="py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-600 text-center">
          Analysis in progress...
        </h2>
      </div>
      <div className="space-y-4 sm:space-y-6 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-8 p-2 sm:p-4">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
            <div
              className="w-full h-full rounded-full transition-all duration-300 ease-out"
              style={{
                background: `conic-gradient(from 180deg at 50% 50%, #FDBA74 0%, #F97316 ${displayProgress}%, #E5E7EB ${displayProgress}%, #E5E7EB 100%)`,
              }}
            />
            <div className="absolute inset-[10px] sm:inset-[12px] md:inset-[15px] bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700 transition-all duration-300">
                {displayProgress}%
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/funnel/growtha-think.png"
              alt="Growtha Bot Mascot"
              width={100}
              height={100}
              className="sm:w-[120px] sm:h-[120px] md:w-36 md:h-36"
            />
          </div>
        </div>

        <ul className="space-y-2 sm:space-y-3 px-2">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex items-center gap-2 sm:gap-3 transition-all duration-500 ease-in-out"
            >
              <div className="relative">
                {completedChecks[index] ? (
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 shrink-0 animate-in zoom-in duration-300" />
                ) : (
                  <div className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-slate-300 rounded-full shrink-0 transition-colors duration-300" />
                )}
              </div>
              <span
                className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                  completedChecks[index]
                    ? "text-slate-700 font-medium"
                    : "text-slate-500"
                }`}
              >
                {step}
              </span>
            </li>
          ))}
        </ul>

        {/* Add a divider */}
        <div className="border-t border-slate-200 mt-4">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
