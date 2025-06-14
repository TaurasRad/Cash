"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`bg-white shadow-md z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16`}
      aria-label="Main navigation"
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image
          src="/logo-main.png"
          alt="Growtha Logo"
          width={120}
          height={40}
          priority
        />
      </Link>
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="#"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          prefetch={false}
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-md transition-colors"
          prefetch={false}
        >
          Sign Up
        </Link>
      </div>
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-brand-orange" />
        ) : (
          <Menu className="h-6 w-6 text-brand-orange" />
        )}
      </button>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col items-center gap-4 py-6 md:hidden animate-fade-in">
          <Link
            href="#"
            className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-md transition-colors"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
