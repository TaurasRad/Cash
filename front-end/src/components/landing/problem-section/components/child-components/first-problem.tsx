import { Check, X } from "lucide-react";

export function CustomerJourney() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img src="/problem1.png" alt="Rating Dashboard" />
    </div>
  );
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="w-full max-w-[240px] space-y-3">
        {/* First Journey - Customer Left */}
        <div className="space-y-1">
          <div className="relative h-8 flex items-center">
            {/* Background line */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center">
              <div className="w-full h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Progress line - stops at failed step */}
            <div
              className="absolute inset-y-0 left-4 flex items-center"
              style={{ width: "calc(33.33% )" }}
            >
              <div className="w-full h-1 bg-orange-500 rounded-full" />
            </div>

            {/* Steps */}
            <div className="relative w-full flex justify-between px-4">
              {/* Step 1 - Completed */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center z-10">
                <Check className="w-3 h-3 text-orange-500" />
              </div>

              {/* Step 2 - Failed */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center z-10">
                <X className="w-3 h-3 text-orange-500" />
              </div>

              {/* Step 3 - Incomplete */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-gray-200 z-10" />

              {/* Step 4 - Incomplete */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-gray-200 z-10" />
            </div>
          </div>

          {/* Label */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-600 font-medium">
              Customer Left
            </span>
          </div>
        </div>

        {/* Second Journey - Purchased */}
        <div className="space-y-1">
          <div className="relative h-8 flex items-center">
            {/* Background line */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center">
              <div className="w-full h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Progress line - goes all the way */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center">
              <div className="w-full h-1 bg-orange-500 rounded-full" />
            </div>

            {/* Steps */}
            <div className="relative w-full flex justify-between px-4">
              {/* All steps completed */}
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="w-6 h-6 rounded-full border-2 border-gray-800 bg-white flex items-center justify-center z-10"
                >
                  <Check className="w-3 h-3 text-orange-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Label */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-600 font-medium">Purchased</span>
          </div>
        </div>
      </div>
    </div>
  );
}
