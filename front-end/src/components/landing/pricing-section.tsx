import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  description: string;
  originalPrice?: string;
  price: string;
  features: PlanFeature[];
  isPopular: boolean;
  cardClass: string;
  buttonClass: string;
  textColorClass: string;
  priceColorClass: string;
  featureCheckColor: string;
}

const features: string[] = [
  "Website Analysis",
  "Performance Audit",
  "Competitor Research",
  "CRO Recommendations",
  "Speed & Performance Check",
  "Mobile Optimization Review",
  "Trust & Credibility Enhancements",
  "User Journey Evaluation",
  "Design Modernization Suggestions",
  "Call-to-Action Optimization",
];

const pricingPlansData = [
  {
    name: "growthaPlus",
    description: "For Individuals",
    originalPrice: "$99",
    price: "$49",
    features: features,
    isPopular: true,
    cardClass: "bg-white border-gray-200",
    buttonClass: "bg-[#FF7D51] hover:bg-[#ff9a7a] text-white",
    textColorClass: "text-gray-700",
    priceColorClass: "text-[#FF7D51]",
    featureCheckColor: "text-[#FF7D51]",
  },
  {
    name: "Pro Enterprise",
    description: "For Enterprises",
    price: "$499",
    features: [
      "All included in growthaPlus",
      "Up to 5 Projects",
      "Dedicated Support",
      "Up to 5 Team Members",
      "Dedicated Account Manager",
    ],
    isPopular: false,
    cardClass: "bg-white border-gray-200",
    buttonClass: "bg-[#FF7D51] hover:bg-[#ff9a7a] text-white",
    textColorClass: "text-gray-700",
    priceColorClass: "text-[#FF7D51]",
    featureCheckColor: "text-[#FF7D51]",
  },
];

export default function PricingSection() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

  return (
    <div className="bg-[#FF7D51] min-h-[100vh] flex flex-col items-center justify-center py-10 rounded-lg mx-2 lg:mx-20">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Ready to 10X Your Website Revenue?
        </h2>
        <p className="text-base sm:text-lg text-white/90 mb-6">
          Join 500+ business owners who transformed their websites into profit
          machines
        </p>
        <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
          <span
            className={`text-white text-base ${
              selectedPlanIndex === 0 ? "font-semibold" : "opacity-70"
            }`}
          >
            for individuals
          </span>
          <button
            className="relative w-12 h-6 bg-white/60 rounded-full transition-colors duration-200 focus:outline-none mx-2"
            role="switch"
            aria-checked={selectedPlanIndex === 1}
            onClick={() =>
              setSelectedPlanIndex(selectedPlanIndex === 0 ? 1 : 0)
            }
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                selectedPlanIndex === 1 ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-white text-base ${
              selectedPlanIndex === 1 ? "font-semibold" : "opacity-70"
            }`}
          >
            for enterprises
          </span>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto lg:hidden">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 pt-10 relative flex flex-col items-center">
          {pricingPlansData[selectedPlanIndex].isPopular && (
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Popular
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold mb-1 text-gray-900">
            {pricingPlansData[selectedPlanIndex].name}
          </h3>
          <div className="flex items-center mb-4 mt-2">
            {pricingPlansData[selectedPlanIndex].originalPrice && (
              <span className="text-xl text-gray-400 line-through mr-2">
                {pricingPlansData[selectedPlanIndex].originalPrice}
              </span>
            )}
            <span className="text-3xl font-extrabold text-[#FF7D51]">
              {pricingPlansData[selectedPlanIndex].price}
            </span>
          </div>
          <p className="text-sm font-semibold mb-3 text-gray-700">
            What's included:
          </p>
          <ul className="space-y-2 mb-8 w-full">
            {pricingPlansData[selectedPlanIndex].features.map(
              (feature: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#FF7D51]" />
                  {feature}
                </li>
              )
            )}
          </ul>
          <Button
            size="lg"
            className="w-full text-base font-semibold py-3 rounded-xl bg-[#FF7D51] hover:bg-[#ff9a7a] text-white mb-2"
          >
            Get started
          </Button>
          <div className="text-xs text-gray-400 mt-1">
            30-day money-back guarantee
          </div>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-2 gap-8 max-w-4xl mx-5 w-full">
        {pricingPlansData.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 pt-10 relative flex flex-col items-center"
          >
            {plan.isPopular && (
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Popular
                </span>
              </div>
            )}
            <h3 className="text-2xl font-bold mb-1 text-gray-900">
              {plan.name}
            </h3>
            <div className="flex items-center mb-4 mt-2">
              {plan.originalPrice && (
                <span className="text-xl text-gray-400 line-through mr-2">
                  {plan.originalPrice}
                </span>
              )}
              <span className="text-3xl font-extrabold text-[#FF7D51]">
                {plan.price}
              </span>
            </div>
            <p className="text-sm font-semibold mb-3 text-gray-700">
              What's included:
            </p>
            <ul className="space-y-2 mb-8 w-full">
              {plan.features.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#FF7D51]" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="w-full text-base font-semibold py-3 rounded-xl bg-[#FF7D51] hover:bg-[#ff9a7a] text-white mb-2"
            >
              Get started
            </Button>
            <div className="text-xs text-gray-400 mt-1">
              30-day money-back guarantee
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
