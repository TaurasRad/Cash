import { Button } from "@/components/ui/button";
import { Rocket, Check } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  const achievements = [
    { text: "+500 Websites Optimized" },
    { text: "$2M Revenue Generated" },
    { text: "97% Client Satisfaction" },
  ];

  return (
    <div className="mt-16 font-sans">
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#BCAAFE] via-[#8C73FF] to-[#5F40D9] text-gray-100 rounded-2xl sm:rounded-3xl lg:rounded-[70px] w-[95%] mx-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm font-medium text-white shadow-md whitespace-nowrap">
            <Rocket className="mr-2 h-4 w-4 text-yellow-400" />
            PROVEN RESULTS • 279% Average Revenue Increase
          </div>

          <h1 className="mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Turn Your Website Into a{" "}
            <span className="block sm:inline">Money-Making Machine</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base sm:text-lg md:text-xl text-gray-200 md:max-w-2xl">
            Stop losing customers to ugly, slow, confusing websites. We
            transform underperforming sites into conversion powerhouses that
            generate real revenue for your business.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-[#FF7171] text-white hover:bg-[#ff5f5f] px-8 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto rounded-lg"
            >
              <Link href="#">Upgrade My Website Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-2 border-white/30 bg-white/20 text-white hover:bg-white/30 px-8 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto rounded-lg"
            >
              <Link href="#">See Customer Reviews</Link>
            </Button>
          </div>

          {/* Updated alignment for achievements list */}
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 mx-auto mt-8">
            {achievements.map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-100">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
