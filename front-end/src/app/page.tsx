"use client";
import React from "react";
import HeroContent from "@/components/landing/hero-section";
import StickyTopBanner from "@/components/landing/sticky-top-banned";
import MainNavbar from "@/components/landing/main-navbar";
import ProblemPointsSection from "@/components/landing/problem-points-section";
import CostOfDoingNothing from "@/components/landing/cost-of-doing-nothing";
import RevenueMachinesSection from "@/components/landing/revenue-machine-section";
import TestimonialsSection from "@/components/landing/testimonial-section";
import PricingSection from "@/components/landing/pricing-section";
import Footer from "@/components/landing/footer";

const WebsiteConversionLanding = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 selection:bg-pink-500 selection:text-white flex flex-col">
      <StickyTopBanner />
      {/* <MainNavbar /> */}
      <main className="flex-grow">
        <HeroContent />
        <ProblemPointsSection />
        <CostOfDoingNothing />
        <RevenueMachinesSection />
        <TestimonialsSection />
        <PricingSection />
        <Footer />
      </main>
    </div>
  );
};

export default WebsiteConversionLanding;
