"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-10 z-40 w-[90%] mx-auto py-1">
        {" "}
        {/* top-10 to account for StickyTopBanner height */}
        <div className="container mx-auto flex h-14 items-center justify-between rounded-2xl bg-purple-600/30 p-3 shadow-lg backdrop-blur-lg md:p-4">
          <Link href="/" className="text-2xl font-bold text-white">
            Logo
          </Link>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/50 hover:bg-white/10 hover:text-white"
            >
              Sign Up
            </Button>
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[calc(2.5rem+3.5rem+0.25rem)] z-30 bg-purple-700/95 backdrop-blur-xl md:hidden">
          {" "}
          {/* Adjust top to be below header */}
          <div className="container mx-auto flex flex-col items-center justify-center h-full space-y-6">
            <Link
              href="#features"
              className="text-xl font-medium text-white hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-xl font-medium text-white hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-xl font-medium text-white hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/80 hover:bg-white/20 hover:text-white w-full max-w-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
