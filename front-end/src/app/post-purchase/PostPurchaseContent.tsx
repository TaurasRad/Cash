"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let confetti: {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncremental: number;
      tiltAngle: number;
    }[] = [];
    let colors = [
      "#a5b4fc",
      "#f472b6",
      "#facc15",
      "#34d399",
      "#60a5fa",
      "#f87171",
      "#c084fc",
    ];
    for (let i = 0; i < 80; i++) {
      confetti.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }
    let angle = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
      }
      update();
    }
    function update() {
      angle += 0.01;
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(angle);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > height) {
          confetti[i] = {
            ...c,
            x: Math.random() * width,
            y: -10,
            tilt: Math.floor(Math.random() * 10) - 10,
          };
        }
      }
    }
    let animationFrame: number;
    function loop() {
      draw();
      animationFrame = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return (
    <canvas ref={ref} className="fixed inset-0 pointer-events-none z-40" />
  );
}

export default function PostPurchaseContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#BCAAFE] via-[#8C73FF] to-[#5F40D9] px-4 relative overflow-hidden">
      {isSuccess && <Confetti />}
      <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border border-gray-200 ring-2 ring-purple-400/20 relative z-10">
        {isSuccess ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle
                className="w-24 h-24 text-green-500 mx-auto mb-2 animate-bounce drop-shadow-glow"
                style={{ filter: "drop-shadow(0 0 16px #34d399)" }}
              />
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text drop-shadow">
                Payment Successful!
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Thank you for your purchase. Your website optimization is
                underway!
              </p>
              <ul className="text-left text-gray-700 mb-6 space-y-2">
                <li>• You&apos;ll receive an email with next steps soon.</li>
                <li>• Our team will reach out if we need more info.</li>
                <li>
                  • Check spam folder if you don&apos;t see it in your inbox.
                </li>
              </ul>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-[#FF7171] to-[#8C73FF] hover:from-[#ff5f5f] hover:to-[#BCAAFE] text-white text-base font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C73FF]"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : isCanceled ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <XCircle
                className="w-24 h-24 text-red-400 mx-auto mb-2 animate-pulse drop-shadow-glow"
                style={{ filter: "drop-shadow(0 0 16px #f87171)" }}
              />
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text drop-shadow">
                Payment Canceled
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Your payment was not completed. If this was a mistake, you can
                try again.
              </p>
              <Link
                href="/web-analysis"
                className="inline-block bg-gradient-to-r from-[#FF7171] to-[#8C73FF] hover:from-[#ff5f5f] hover:to-[#BCAAFE] text-white text-base font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C73FF]"
              >
                Return to Checkout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <HelpCircle
                className="w-20 h-20 text-yellow-400 mx-auto mb-2 animate-spin-slow"
                style={{ filter: "drop-shadow(0 0 12px #facc15)" }}
              />
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Post Purchase
              </h2>
              <p className="text-gray-700 mb-4">
                We couldn&apos;t determine your payment status. Please check
                your email or contact support if you have questions.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="/"
                  className="inline-block bg-gradient-to-r from-[#FF7171] to-[#8C73FF] hover:from-[#ff5f5f] hover:to-[#BCAAFE] text-white text-base font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C73FF]"
                >
                  Back to Home
                </Link>
                <a
                  href="mailto:support@yourdomain.com"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-bold px-7 py-3 rounded-lg shadow-lg hover:scale-105 transition-all border-2 border-white/20"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl z-0" />
    </div>
  );
}
// Add this to your global CSS or Tailwind config:
// .drop-shadow-glow { filter: drop-shadow(0 0 16px currentColor); }
// .animate-spin-slow { animation: spin 2.5s linear infinite; }
