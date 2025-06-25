import { Rocket, Check } from "lucide-react";
import Link from "next/link";
import TrustedBySection from "./trusted-by-section";

export default function HeroSection() {
  return (
    <div className="relative w-full py-10 bg-white bg-grid-pattern bg-[size:40px_40px] flex flex-col gap-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="inline-flex items-center justify-center bg-black text-white px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Rocket className="w-4 h-4 mr-2 text-brand-orange" />
          279% Average Revenue Increase
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
          Turn Website Into a<br />
          <span className="text-brand-orange">Money-Making</span>
          <br />
          <span className="text-brand-orange">Machines</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
          Smart design. Smarter data. Our AI-driven model identifies what&apos;s
          broken, fixes what matters, and{" "}
          <span className="font-semibold text-gray-900">
            turns more visitors into cash
          </span>{" "}
          for your business
        </p>

        <div className="mt-10">
          <Link
            href="#"
            className="inline-block px-10 py-4 text-lg font-semibold text-gray-900 bg-white border-2 border-brand-orange rounded-xl shadow-md hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
          >
            Try Growtha
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-w-3xl mx-auto text-sm text-gray-600">
          <div className="flex items-center justify-center sm:justify-start">
            <Check className="w-5 h-5 mr-2 text-brand-orange" />
            <span>+500 Websites Optimized</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start">
            <Check className="w-5 h-5 mr-2 text-brand-orange" />
            <span>+$540k Extra Revenue Generated</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start lg:col-span-1 sm:col-span-2 lg:justify-center">
            <Check className="w-5 h-5 mr-2 text-brand-orange" />
            <span>97% Client Satisfaction</span>
          </div>
        </div>
      </div>
      {/* <TrustedBySection /> */}
    </div>
  );
}
