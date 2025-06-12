"use client";

import { useEffect, useState, useRef } from "react";

export default function StickyBottomButton() {
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
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
  }, []);

  return (
    <div className=" flex justify-center">
      <button
        ref={buttonRef}
        className={`
          fixed bottom-2 left-1/2 z-50 transform -translate-x-1/2 bg-[#5F40D9] hover:bg-purple-700 text-white font-bold py-2 px-6 
          rounded-full shadow-lg hover:scale-105 w-fit border-4 border-white
          transition-opacity duration-300
          ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        ( COPY CTA )
      </button>
    </div>
  );
}
