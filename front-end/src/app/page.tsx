"use client";
import React from "react";
import HeroContent from "@/components/landing/hero-section";
import StickyTopBanner from "@/components/landing/sticky-top-banned";
import CostOfDoingNothing from "@/app/funnel/components/custom-components/cost-of-doing-nothing";
import RevenueMachinesSection from "@/components/landing/revenue-machine-section";
import Navbar from "@/components/landing/navbar";
import TestimonialsSection from "@/components/landing/testimonial-section";
import PricingSection from "@/components/landing/pricing-section";
import Footer from "@/components/landing/footer";
import MovingQuestionSection from "@/components/landing/moving-queston-section";
import TrustedBySection from "@/components/landing/trusted-by-section";
import { useHeaderScrollEffects } from "@/hooks/use-header-scroll";
import { ProblemPointsSection } from "@/components/landing/problem-section/problem-points-section";
import StickyCTA from "@/components/landing/sticky-cta";
import EmailDiscountModal from "@/components/landing/email-discount-modal";
import AgentWork from "@/components/landing/agent-work";

const NAVBAR_HEIGHT = 64; // Corresponds to h-16
const BANNER_HEIGHT = 48;

const WebsiteConversionLanding = () => {
  const { navbarTransformY, bannerTopOffset, mainContentPaddingTop } =
    useHeaderScrollEffects({
      navbarHeight: NAVBAR_HEIGHT,
      bannerHeight: BANNER_HEIGHT,
    });

  return (
    <>
      {/* <EmailDiscountModal /> */}
      <div className="min-h-screen bg-grid-pattern bg-[size:40px_40px] text-gray-800 selection:bg-pink-500 selection:text-white flex flex-col">
        <Navbar />
        {/* <StickyTopBanner /> */}
        {/* <StickyCTA /> */}
        <main className="flex flex-col gap-14 sm:gap-28">
          <HeroContent />
          {/* <CostOfDoingNothing /> */}
          {/* <ProblemPointsSection /> */}
          <RevenueMachinesSection />
          {/* <AgentWork /> */}
          {/* <TestimonialsSection /> */}
          {/* <PricingSection /> */}
          {/* <MovingQuestionSection /> */}
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
};

export default WebsiteConversionLanding;
