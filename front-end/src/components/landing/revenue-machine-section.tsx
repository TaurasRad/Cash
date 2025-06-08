// No import for Lucide icons needed if only using emojis
// import { Search, Palette, Smartphone, Target } from 'lucide-react'
// import type { LucideProps } from "lucide-react"

interface BenefitItem {
  emoji: string; // Changed from icon component to emoji string
  iconBgClass: string;
  title: string;
  description: string;
}

const benefitItemsData: BenefitItem[] = [
  {
    emoji: "🔍", // Magnifying Glass Tilted Left emoji
    iconBgClass: "bg-purple-500",
    title: "Deep Performance Audit",
    description:
      "We analyze every aspect of your site - speed, UX, conversion paths, SEO, and mobile performance. You get a detailed report showing exactly what's killing your conversions.",
  },
  {
    emoji: "🎨", // Artist Palette emoji
    iconBgClass: "bg-blue-500",
    title: "Modern Design Overhaul",
    description:
      "We create stunning, professional designs that build trust instantly. Your new site will look like it belongs to an industry leader, not a budget operation.",
  },
  {
    emoji: "📱", // Mobile Phone emoji
    iconBgClass: "bg-indigo-500",
    title: "Mobile-First Experience",
    description:
      "Perfect mobile experience that converts. Your site will look and work beautifully on every device, capturing mobile traffic that competitors miss.",
  },
  {
    emoji: "🎯", // Direct Hit (Target) emoji
    iconBgClass: "bg-pink-500",
    title: "Conversion Optimization",
    description:
      "Strategic placement of calls-to-action, trust signals, and persuasive copy that guides visitors toward becoming paying customers.",
  },
];

export default function RevenueMachinesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            We Turn Websites Into
          </h2>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Revenue Machines
          </h2>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 mb-10">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              200+
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Companies Helped
            </div>
          </div>
          <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              $4M+
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Revenue Unlocked
            </div>
          </div>
          <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              127%
            </div>
            <div className="text-sm md:text-base text-gray-500">
              Avg. Conversion Rate Lift
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 max-w-3xl mx-auto">
          {benefitItemsData.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-700 p-3 sm:p-6 md:p-6 rounded-3xl md:rounded-3xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-row items-center space-x-3 md:space-x-5 mb-1">
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${item.iconBgClass}`}
                >
                  <span
                    className="text-xl sm:text-2xl md:text-3xl"
                    role="img"
                    aria-label={item.title.split(" ")[0] + " emoji"}
                  >
                    {item.emoji}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
