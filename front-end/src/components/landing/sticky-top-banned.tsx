"use client";

import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyTopBanner() {
  const saleEnd = new Date();
  saleEnd.setDate(saleEnd.getDate() + 1);
  saleEnd.setHours(23, 59, 59, 999);

  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isSaleActive, setIsSaleActive] = useState<boolean>(true);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = saleEnd.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Sale Ended");
        setIsSaleActive(false);
        return;
      }
      setIsSaleActive(true);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [saleEnd]);

  return (
    <div
      className={`sticky z-50 flex items-center justify-center bg-slate-900 shadow-xl h-10`}
      style={{ top: `0rem` }}
    >
      <Sun className="mr-3 h-5 w-5 text-yellow-400" aria-hidden="true" />
      <div className="flex items-center gap-x-3">
        <span className="font-semibold text-md text-white tracking-tight">
          SUMMER SALE: 50% OFF
        </span>
        {isSaleActive ? (
          <span className="font-mono text-md bg-yellow-400/10 text-yellow-300 px-3 py-1 rounded-md tabular-nums">
            {timeLeft}
          </span>
        ) : (
          <span className="font-semibold text-md text-red-400 bg-red-500/10 px-3 py-1 rounded-md">
            {timeLeft}
          </span>
        )}
      </div>
      <Sun className="ml-3 h-5 w-5 text-yellow-400" aria-hidden="true" />
    </div>
  );
}
