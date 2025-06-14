"use client";

import { useEffect, useState, useRef } from "react";

export default function StickyBottomButton() {
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      console.log("Scrolled down:", scrollTop);
      if (scrollTop > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showButton]);

  return (
    <div className=" flex justify-center">
      <button
        ref={buttonRef}
        className={`
          fixed bottom-4 left-1/2 z-50 transform -translate-x-1/2
          inline-block px-6 sm:px-10 py-3 text-base sm:text-lg font-semibold text-gray-900 bg-white border-2 border-brand-orange rounded-full shadow-md hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 duration-300 whitespace-nowrap
          ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        Try Growtha
      </button>
    </div>
  );
}
