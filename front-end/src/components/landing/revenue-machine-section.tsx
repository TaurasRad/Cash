import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { ReactNode } from "react";

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
    <div className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-semibold text-normal lg:text-5xl">
            We Turn Websites Into Revenue Machines
          </h2>
          <p className="mt-4">
            Libero sapiente aliquam quibusdam aspernatur, praesentium iusto
            repellendus.
          </p>
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

        <div className="flex flex-col sm:flex-col md:flex-row gap-4 md:gap-8">
          {benefitItemsData.map((item, index) => (
            <Card
              className="group border-0 bg-muted shadow-none bg-gray-200"
              key={index}
            >
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Zap className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 font-medium">Customizable</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">
                  Extensive customization options, allowing you to tailor every
                  aspect to meet your specific needs.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4">
            Libero sapiente aliquam quibusdam aspernatur, praesentium iusto
            repellendus.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group border-0 bg-muted shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Customizable</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Extensive customization options, allowing you to tailor every
                aspect to meet your specific needs.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-muted shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">You have full control</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                From design elements to functionality, you have complete control
                to create a unique and personalized experience.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-muted shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Powered By AI</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Elements to functionality, you have complete control to create a
                unique experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div
    aria-hidden
    className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
);
