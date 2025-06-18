import { Sparkles, BarChart3, LayoutDashboard, Zap } from "lucide-react";
import { CustomerJourney } from "./child-components/first-problem";
import { PerformanceAudit } from "./child-components/second-problem";
import { RatingDashboard } from "./child-components/third-problem";

interface Problem {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const problemsData: Problem[] = [
  {
    icon: <Sparkles className="w-6 h-6 text-brand-orange" />,
    title: "AI-Powered CRO Audits",
    description:
      "Get recommendations to fix conversions and optimize your website. Improve results with actionable AI-driven insights.",
    content: <CustomerJourney />,
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-brand-orange" />,
    title: "Real-Time Analytics Dashboard",
    description:
      "Monitor your website's performance with intuitive reports. Make informed decisions with accurate data.",
    content: <PerformanceAudit />,
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-brand-orange" />,
    title: "Custom Dashboards",
    description:
      "Easily create personalized dashboards to track the metrics that matter.",
    content: <RatingDashboard />,
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-orange" />,
    title: "Automated A/B Testing",
    description:
      "Effortlessly run A/B tests to discover winning variations. Boost conversion rates with automated, data-backed optimization strategies.",
    content: <p>Optimize Faster</p>,
  },
];
