"use client";

import { useState, useEffect } from "react";

interface HeaderScrollEffectsProps {
  navbarHeight: number;
  bannerHeight: number;
}

interface HeaderScrollEffectsReturn {
  navbarTransformY: number;
  bannerTopOffset: number;
  mainContentPaddingTop: number;
}

export function useHeaderScrollEffects({
  navbarHeight,
  bannerHeight,
}: HeaderScrollEffectsProps): HeaderScrollEffectsReturn {
  const [navbarTransformY, setNavbarTransformY] = useState(0);
  const [bannerTopOffset, setBannerTopOffset] = useState(navbarHeight);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Navbar slides up with scroll, stopping when fully hidden
      const newNavbarTransform = -Math.min(scrollY, navbarHeight);
      setNavbarTransformY(newNavbarTransform);

      // Banner slides up to the top of the viewport as navbar hides
      const newBannerTop = Math.max(0, navbarHeight - scrollY);
      setBannerTopOffset(newBannerTop);
    };

    // Set initial positions correctly
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]); // Re-run effect if navbarHeight changes

  // This padding is constant and ensures content doesn't jump
  const mainContentPaddingTop = navbarHeight + bannerHeight;

  return { navbarTransformY, bannerTopOffset, mainContentPaddingTop };
}
