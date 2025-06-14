import { Sparkles, BarChart3, LayoutDashboard, Zap } from "lucide-react";

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
    content: <p>AI Insights</p>,
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-brand-orange" />,
    title: "Real-Time Analytics Dashboard",
    description:
      "Monitor your website's performance with intuitive reports. Make informed decisions with accurate data.",
    content: <p>Data Driven</p>,
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-brand-orange" />,
    title: "Custom Dashboard Creation",
    description:
      "Easily create personalized dashboards to track the metrics that matter. Stay focused on your business goals with clarity.",
    content: <p>Easy to Use</p>,
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-orange" />,
    title: "Automated A/B Testing",
    description:
      "Effortlessly run A/B tests to discover winning variations. Boost conversion rates with automated, data-backed optimization strategies.",
    content: <p>Optimize Faster</p>,
  },
];
