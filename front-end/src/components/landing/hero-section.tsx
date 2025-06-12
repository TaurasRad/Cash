import { Button } from "@/components/ui/button";
import { Rocket, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroContent() {
  const achievements = [
    { text: "+500 Websites Optimized" },
    { text: "$2M Revenue Generated" },
    { text: "97% Client Satisfaction" },
  ];

  // Typewriter effect for the full heading
  const fullText = "Turn Your Website Into a Money-Making Machine";
  const splitIndex = fullText.indexOf("a ") + 2; // after 'a '
  const highlightStart = fullText.indexOf("Money-Making Machine");
  const highlightEnd = highlightStart + "Money-Making Machine".length;
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(""); // Only clear once at the start
    let current = 0;
    const interval = setInterval(() => {
      if (current <= fullText.length) {
        setDisplayed(fullText.slice(0, current));
        current++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 font-sans">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#BCAAFE] via-[#8C73FF] to-[#5F40D9] text-gray-100 rounded-2xl sm:rounded-3xl lg:rounded-[70px] w-[80%] mx-auto"
      >
        <div className="container mx-auto px-4 text-center max-w-3xl lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs sm:text-sm font-medium text-white shadow-md whitespace-normal break-words max-w-full min-w-0"
            style={{ wordBreak: "break-word" }}
          >
            <Rocket className="mr-2 h-4 w-4 text-yellow-400 flex-shrink-0" />
            <span
              className="text-[11px] sm:text-xs md:text-sm leading-tight text-white font-semibold"
              style={{ wordBreak: "break-word" }}
            >
              PROVEN RESULTS • 279% Average Revenue Increase
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mb-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            {(() => {
              const nextLetter =
                displayed.length < fullText.length
                  ? fullText[displayed.length]
                  : null;
              const isNextHighlighted =
                displayed.length >= highlightStart &&
                displayed.length < highlightEnd;
              // Split displayed at splitIndex
              const firstLine = displayed.slice(
                0,
                Math.min(displayed.length, splitIndex)
              );
              const secondLine =
                displayed.length > splitIndex
                  ? displayed.slice(splitIndex)
                  : "";

              const isTypingFirstLine = displayed.length < splitIndex;
              return (
                <>
                  <span>
                    {firstLine}
                    {isTypingFirstLine && nextLetter && (
                      <span
                        style={{
                          filter: "blur(2px)",
                          opacity: 0.5,
                          color: isNextHighlighted ? "#FF7171" : "white",
                          transition: "color 0.2s",
                        }}
                      >
                        {nextLetter}
                      </span>
                    )}
                  </span>
                  <br />
                  <span>
                    {secondLine.length === 0 ? null : splitIndex >
                        highlightStart || displayed.length <= highlightStart ? (
                      <>
                        {secondLine}
                        {!isTypingFirstLine && nextLetter && (
                          <span
                            style={{
                              filter: "blur(2px)",
                              opacity: 0.5,
                              color: isNextHighlighted ? "#FF7171" : "white",
                              transition: "color 0.2s",
                            }}
                          >
                            {nextLetter}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {secondLine.slice(0, highlightStart - splitIndex)}
                        <span className="text-[#FF7171]">
                          {secondLine.slice(
                            highlightStart - splitIndex,
                            Math.min(displayed.length, highlightEnd) -
                              splitIndex
                          )}
                        </span>
                        {displayed.length > highlightEnd &&
                          secondLine.slice(highlightEnd - splitIndex)}
                        {!isTypingFirstLine && nextLetter && (
                          <span
                            style={{
                              filter: "blur(2px)",
                              opacity: 0.5,
                              color: isNextHighlighted ? "#FF7171" : "white",
                              transition: "color 0.2s",
                            }}
                          >
                            {nextLetter}
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </>
              );
            })()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mx-auto mb-10 max-w-xl text-base sm:text-lg md:text-xl text-gray-200 md:max-w-2xl"
          >
            Stop losing customers to ugly, slow, confusing websites. We
            transform underperforming sites into conversion powerhouses that
            generate real revenue for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-[#FF7171] text-white hover:bg-[#ff5f5f] px-8 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto rounded-lg"
            >
              <Link href="/web-analysis">Upgrade My Website Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-2 border-white/30 bg-white/20 text-white hover:bg-white/30 px-8 py-3 text-base font-semibold shadow-lg transition-all hover:shadow-xl sm:w-auto rounded-lg"
            >
              <Link href="#">See Customer Reviews</Link>
            </Button>
          </motion.div>

          {/* Updated alignment for achievements list */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 mx-auto mt-8"
          >
            {achievements.map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-100">
                  {item.text}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>
    </div>
  );
}
