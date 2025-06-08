import { Sparkles } from "lucide-react";

export default function StickyTopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-10 items-center justify-center bg-black px-4 text-sm font-medium text-yellow-400">
      <Sparkles className="mr-2 h-4 w-4" />
      <span>SUMMER SALE: 50% OFF</span>
      <Sparkles className="ml-2 h-4 w-4" />
    </div>
  );
}
