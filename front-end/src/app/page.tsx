"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Zap,
  Shield,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const WebsiteConversionLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Bring Design That Boosts Customers",
      description:
        "Strategically crafted designs that convert visitors into paying customers with proven conversion optimization techniques.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Compelling User Experience",
      description:
        "Create intuitive user journeys that guide visitors seamlessly from landing to conversion with optimized UX patterns.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Conversion Strategy",
      description:
        "Implement rapid conversion tactics that turn browsers into buyers within minutes of landing on your site.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Mobile Checker",
      description:
        "Ensure your website performs flawlessly across all devices with comprehensive mobile optimization testing.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Qualified CRO Practices",
      description:
        "Apply industry-leading conversion rate optimization practices backed by data and proven methodologies.",
    },
  ];

  const services = [
    {
      title: "Deep Performance Audit",
      description:
        "We conduct deep analysis of your site, identify bottlenecks with data, and create actionable optimization recommendations.",
    },
    {
      title: "Modern Design Overhaul",
      description:
        "Transform outdated interfaces into modern, high-converting designs that captivate and convert your target audience.",
    },
    {
      title: "Mobile-First Experience",
      description:
        "Optimize every interaction for mobile users while ensuring seamless desktop experiences across all touchpoints.",
    },
    {
      title: "Conversion Optimization",
      description:
        "Implement proven conversion strategies and A/B testing frameworks to maximally optimize your revenue potential.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-black/20 backdrop-blur-lg border-b border-white/10"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FLOWBOOST
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="hover:text-blue-300 transition-colors"
              >
                Services
              </a>
              <a
                href="#features"
                className="hover:text-blue-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="hover:text-blue-300 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <a
                href="#services"
                className="block hover:text-blue-300 transition-colors"
              >
                Services
              </a>
              <a
                href="#features"
                className="block hover:text-blue-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="block hover:text-blue-300 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            PROVEN RESULTS • 247% Average Revenue Increase
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Turn Your Website Into a{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Money-Making Machine
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop losing customers to poor design. We transform underperforming
            sites into high-converting revenue engines that work 24/7 for your
            business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
              onClick={() => router.push("/web-analysis")}
            >
              Upgrade My Website Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              See Customer Reviews
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">247%</div>
              <div className="text-sm text-gray-400">Average ROI Boost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">500+</div>
              <div className="text-sm text-gray-400">Websites Optimized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-gray-400">Revenue Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-3xl p-8 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-red-300">
              The Cost of Doing Nothing
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Most business websites are silent profit killers. Every day
              without optimization, you're bleeding potential customers and
              revenue. Don't let poor design cost you another sale.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              We Turn Websites Into{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Revenue Machines
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our proven system transforms underperforming websites into
              high-converting sales engines that work around the clock to grow
              your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-300">
              Comprehensive website optimization solutions designed to maximize
              your conversions
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Website?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses that have transformed their websites
            into high-converting revenue machines. Get started today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center">
              Start My Transformation
              <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto border-2 border-white/30 hover:border-white/50 px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            FLOWBOOST
          </div>
          <p className="text-gray-400 mb-8">
            Transforming websites into revenue-generating machines since 2020
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteConversionLanding;
