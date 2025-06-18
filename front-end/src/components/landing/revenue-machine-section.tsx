import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";

export default function RevenueMachinesSection() {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 lg:text-5xl">
            We Turn Websites Into
            <br />
            <span className="text-[#FF6B4A]">Revenue Machines</span>
          </h2>
        </div>

        {/* Stats Row */}
        <div className="flex flex-row justify-center items-center gap-6 md:gap-12 mb-16">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-gray-800">
              500+
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Companies Helped
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-gray-800">
              $700k+
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Revenue Unlocked
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-gray-800">
              327%
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Avg. Conv. Rate Lift
            </div>
          </div>
        </div>

        {/* Meet Growtha Section */}
        <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 lg:p-16 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet <span className="text-[#FF6B4A]">Grow</span>tha
            </h3>
            <p className="text-lg md:text-xl text-gray-600">
              Your Dedicated Conversion Growth Agent
            </p>
          </div>

          {/* Desktop Layout with Features */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
            {/* Left Features */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    A/B Test Optimization
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    User Behavior Analysis
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Conversion Funnel Audit
                  </span>
                </div>
              </div>
            </div>

            {/* Center - Robot */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <Image
                  src="/growtha.png"
                  alt="Growtha - Your Dedicated Conversion Growth Agent"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Features */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Landing Page Enhancement
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Performance Monitoring
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Revenue Growth Strategy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Centered Robot Only */}
          <div className="flex justify-center lg:hidden">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/growtha.png"
                alt="Growtha - Your Dedicated Conversion Growth Agent"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
