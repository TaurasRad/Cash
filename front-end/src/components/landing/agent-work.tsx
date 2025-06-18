import Image from "next/image";

export default function AgentWork() {
  return (
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
            Instantly Know What's
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
            Killing Your Conversions
          </h2>
        </div>
        {/* Main Container with rounded border */}
        <div className="bg-white rounded-3xl border-2 border-gray-800 p-8 md:p-12 shadow-2xl">
          {/* Flow Diagram */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Image
                src="/growtha-think.png"
                alt="Growtha AI Flow Diagram"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="text-center">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              No more guesswork, no more digging through endless analytics. Our
              AI agent, trained on insights from 5,000+ high-performing websites
              and industry-proven CRO best practices, identifies exactly where
              users drop off — and tells you what to fix and why. Get clear,
              actionable recommendations in seconds, so you can stop losing
              customers and start optimizing with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
