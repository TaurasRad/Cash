"use client";

import Link from "next/link";
import { MountainIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className={`bg-white shadow-md z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16`}
      aria-label="Main navigation"
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-slate-800" />
        <span className="text-lg font-semibold text-slate-800">MySite</span>
      </Link>
      <div className="flex items-center gap-4">
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
    </nav>
  );
}
