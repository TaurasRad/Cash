"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Zap, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Helper to format large numbers into compact strings like $1.5M
const formatCurrency = (value: number) => {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  }
  return `$${value.toFixed(0)}`;
};

export default function RevenueCalculator() {
  const [visitors, setVisitors] = useState(39000);
  const [aov, setAov] = useState(400);
  const [currentCvr] = useState(9.5); // Kept static as per design
  const [improvedCvr, setImprovedCvr] = useState(24.3);

  const {
    currentMonthlyRevenue,
    improvedMonthlyRevenue,
    monthlyIncrease,
    percentageIncrease,
    annualIncrease,
  } = useMemo(() => {
    const currentRevenue = visitors * aov * (currentCvr / 100);
    const improvedRevenue = visitors * aov * (improvedCvr / 100);
    const increase = improvedRevenue - currentRevenue;
    const percentIncrease =
      currentRevenue > 0 ? (increase / currentRevenue) * 100 : 0;
    const annual = increase * 12;

    return {
      currentMonthlyRevenue: currentRevenue,
      improvedMonthlyRevenue: improvedRevenue,
      monthlyIncrease: increase,
      percentageIncrease: percentIncrease,
      annualIncrease: annual,
    };
  }, [visitors, aov, currentCvr, improvedCvr]);

  const handleQuickImprovement = (percentage: number) => {
    const newCvr = currentCvr * (1 + percentage / 100);
    setImprovedCvr(newCvr > 50 ? 50 : newCvr); // Cap CVR at 50%
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-2xl">
          {/* Left Panel: Controls */}
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Monthly revenue calculator
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300">
                    Monthly website visitors
                  </label>
                  <span className="font-semibold">
                    {visitors.toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[visitors]}
                  onValueChange={(val) => setVisitors(val[0])}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="[&>span:first-child]:h-full [&>span:first-child]:bg-purple-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300">
                    Average order value ($)
                  </label>
                  <span className="font-semibold">${aov.toLocaleString()}</span>
                </div>
                <Slider
                  value={[aov]}
                  onValueChange={(val) => setAov(val[0])}
                  min={10}
                  max={2000}
                  step={10}
                  className="[&>span:first-child]:h-full [&>span:first-child]:bg-purple-500"
                />
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">
                  Conversion rate impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm text-gray-300">
                      Current CVR
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 ml-2 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your current Conversion Rate (CVR).</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-3xl font-bold">
                      {currentCvr.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-300">
                      Improved CVR
                    </label>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-purple-400">
                        {improvedCvr.toFixed(1)}%
                      </span>
                      <span className="ml-2 text-sm font-semibold text-purple-400">
                        +{((improvedCvr / currentCvr - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[improvedCvr]}
                    onValueChange={(val) => setImprovedCvr(val[0])}
                    min={currentCvr}
                    max={50}
                    step={0.1}
                    className="[&>span:first-child]:h-full [&>span:first-child]:bg-purple-500"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-3">
                    Quick improvements:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100].map((perc) => (
                      <Button
                        key={perc}
                        variant="outline"
                        size="sm"
                        className="bg-slate-700 border-slate-600 hover:bg-slate-600"
                        onClick={() => handleQuickImprovement(perc)}
                      >
                        <Zap className="w-4 h-4 mr-1" /> +{perc}%
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Results */}
          <div className="flex flex-col justify-center items-center space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Card className="bg-slate-800 border-slate-700 text-center p-6 w-full sm:w-auto">
                <p className="text-sm text-gray-400 mb-1">
                  Current monthly revenue
                </p>
                <p className="text-3xl font-bold">
                  {formatCurrency(currentMonthlyRevenue)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  @ {currentCvr.toFixed(1)}% conversion
                </p>
              </Card>
              <ArrowRight className="text-gray-500 rotate-90 sm:rotate-0" />
              <Card className="bg-slate-800 border-slate-700 text-center p-6 w-full sm:w-auto">
                <p className="text-sm text-gray-400 mb-1">
                  Improved monthly revenue
                </p>
                <p className="text-3xl font-bold text-purple-400">
                  {formatCurrency(improvedMonthlyRevenue)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  @ {improvedCvr.toFixed(1)}% conversion
                </p>
              </Card>
            </div>
            <Card className="bg-slate-800 border-slate-700 text-center p-8 w-full">
              <p className="text-lg text-gray-300 mb-2">
                Monthly revenue increase
              </p>
              <p className="text-5xl font-extrabold text-purple-400">
                +{formatCurrency(monthlyIncrease)}
              </p>
              <p className="text-md font-semibold text-purple-400 mt-2">
                +{percentageIncrease.toFixed(1)}%
              </p>
              <hr className="border-slate-700 my-6" />
              <p className="text-md text-gray-300">
                That&apos;s{" "}
                <span className="font-bold text-purple-400">
                  {formatCurrency(annualIncrease)}
                </span>{" "}
                additional revenue per year!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
