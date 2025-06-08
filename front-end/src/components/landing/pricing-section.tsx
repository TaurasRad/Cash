import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

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

const pricingPlansData: PricingPlan[] = [
  {
    name: "Premium",
    description: "For Individuals",
    originalPrice: "$99",
    price: "$49",
    features: [
      { text: "Website Analysis" },
      { text: "Performance Audit" },
      { text: "Competitor Research" },
      { text: "CRO Recommendations" },
      { text: "Speed & Performance Check" },
      { text: "Mobile Optimization Review" },
      { text: "Trust & Credibility Enhancements" },
      { text: "User Journey Evaluation" },
      { text: "Design Modernization Suggestions" },
      { text: "Call-to-Action Optimization" },
      { text: "Accessibility & UX Checks" },
      { text: "Design Overhaul" },
    ],
    isPopular: true,
    cardClass: "bg-white border-gray-200",
    buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
    textColorClass: "text-gray-700",
    priceColorClass: "text-gray-900",
    featureCheckColor: "text-purple-600",
  },
  {
    name: "Pro",
    description: "For Enterprises",
    price: "$499",
    features: [
      { text: "All included in Premium Version" },
      { text: "Up to 5 Projects" },
      { text: "Dedicated Support" },
      { text: "Up to 5 Team Members" },
      { text: "Dedicated Account Manager" },
    ],
    isPopular: false,
    cardClass: "bg-white/10 backdrop-blur-sm border-white/20",
    buttonClass: "bg-white hover:bg-gray-100 text-purple-700",
    textColorClass: "text-white",
    priceColorClass: "text-white",
    featureCheckColor: "text-purple-300",
  },
];

export default function PricingSection() {
  return (
    <div className="pb-8 sm:pb-12 md:pb-16 bg-gray-100">
      <div className="bg-gradient-to-br from-[#BCAAFE] via-[#8C73FF] to-[#5F40D9] text-white rounded-2xl sm:rounded-3xl lg:rounded-[70px] w-[95%] mx-auto py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Ready to 10X Your Website Revenue?
            </h2>
            <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto">
              Join 500+ business owners who transformed their websites into
              profit machines
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingPlansData.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 sm:p-6 rounded-xl sm:rounded-xl lg:rounded-xl shadow-2xl border relative flex flex-col",
                  plan.cardClass
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-6 -mt-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Popular
                  </div>
                )}
                <div className="flex-grow">
                  <h3
                    className={cn(
                      "text-lg sm:text-xl font-bold mb-1",
                      plan.textColorClass
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "text-xs mb-4",
                      plan.isPopular ? "text-gray-500" : "text-purple-200"
                    )}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span
                        className={cn(
                          "text-lg line-through mr-2",
                          plan.isPopular ? "text-purple-300" : "text-gray-400"
                        )}
                      >
                        {plan.originalPrice}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-2xl sm:text-3xl font-extrabold",
                        plan.priceColorClass
                      )}
                    >
                      {plan.price}
                    </span>
                  </div>

                  <p
                    className={cn(
                      "text-xs font-semibold mb-2",
                      plan.textColorClass
                    )}
                  >
                    What's included
                  </p>
                  <ul className="space-y-1 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2
                          className={cn(
                            "w-4 h-4 mr-2 flex-shrink-0",
                            plan.featureCheckColor
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs",
                            plan.isPopular ? "text-gray-600" : "text-purple-100"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  size="lg"
                  className={cn(
                    "w-full text-sm font-semibold py-2 rounded-lg",
                    plan.buttonClass
                  )}
                >
                  Get started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
