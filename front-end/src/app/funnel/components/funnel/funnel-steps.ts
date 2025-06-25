import { FunnelSteps } from "@/app/funnel/components/funnel/types";
import { ProblemPointsSection } from "../custom-components/problem-section/problem-points-section";
import CostWithTrust from "../custom-components/cost-with-trust";
import LastStep from "../custom-components/last-step";
import Analyze from "../custom-components/analyze/analyze";

export const funnelSteps: FunnelSteps = {
  1: {
    title: "What's your primary goal for improving this website?",
    type: "options",
    options: [
      "Increase conversion rate",
      "Reduce bounce rate",
      "Improve average order value",
      "Grow email list/subscribers",
      "Increase user engagement",
      "Optimize for mobile users",
    ],
  },
  2: {
    title: "What type of bussiness or site are you running?",
    type: "options",
    options: [
      "Ecommerce",
      "Lead generation",
      "Saas/product site",
      "Informational site",
      "Portfolio/Personal brand",
      "Other",
    ],
  },
  3: {
    title: "What's your monthly website traffic?",
    type: "options",
    options: [
      "Less than 1,000 visits/month",
      "1,000-10,000",
      "10,000-50,000",
      "50,000-250,000",
      "250,000+",
      "Not sure",
    ],
  },
  4: {
    title: "Most business websites are profit killers",
    subtitle: "Running a small business today is already tough.",
    type: "component",
    component: ProblemPointsSection,
  },
  5: {
    title: "Where does most of your traffic come from?",
    type: "options",
    options: [
      "Organic search",
      "Paid ads",
      "Social media",
      "Direct/brand traffic",
      "Referrals/affiliates",
      "Email/newsletter",
    ],
  },
  6: {
    title: "Who is your primary audience or customer persona?",
    type: "options",
    options: [
      "B2C (selling to individuals)",
      "B2B (selling to businesses)",
      "Mixed B2B/B2C",
      "Not sure yet",
    ],
  },
  7: {
    title: "What's your current website built with?",
    type: "options",
    options: [
      "Shopify",
      "WordPress",
      "Webflow",
      "Wix/Squarespace",
      "Custom code (HTML/CSS/JS)",
      "Other",
    ],
  },
  8: {
    title: "What's your current website built with?",
    type: "component",
    component: CostWithTrust,
  },
  9: {
    title: "How do you currently measure success on your website?",
    type: "options",
    options: [
      "Sales / transactions",
      "Form submissions / leads",
      "Signups / registrations",
      "Scroll depth / time on page",
      "Bounce rate / exit rate",
      "I'm not actively tracking anything yet",
    ],
  },
  10: {
    title: "What best describes your current CRO approach?",
    type: "options",
    options: [
      "I'm guessing and changing things based on intuition",
      "I use tools like Hotjar, GA4, or heatmaps to guide changes",
      "I run A/B tests to measure what works",
      "I work with an agency / freelancer",
      "I don't really have a strategy yet",
    ],
  },
  11: {
    type: "component",
    header: false,
    component: LastStep,
    input: true,
  },
  12: {
    header: false,
    type: "component",
    component: Analyze,
  },
};
