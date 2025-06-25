import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = [
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Socials", href: "#" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-12 sm:py-16">
      <div className="container mx-auto flex flex-col items-center text-center gap-8 px-4">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <Link href="/">
              <Image
                src="/logo-main.png"
                alt="Growtha Logo"
                width={140}
                height={38}
                priority
              />
            </Link>
            <p className="text-lg text-gray-700 max-w-sm">
              Smart design. Smarter data. More Customers.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-center lg:justify-start gap-2 text-gray-600 hover:text-gray-900"
              >
                <Zap className="h-5 w-5 text-[#FF6B4F]" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
          <p className="text-sm text-gray-500 order-2 lg:order-1">
            © Growtha {new Date().getFullYear()} All rights reserved.
          </p>

          <Button
            variant="default"
            className="bg-[#FF6B4F] hover:bg-[#E66047] text-white rounded-full px-8 py-3 text-base font-semibold order-1 lg:order-2"
            size="lg"
          >
            Powered by AI
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
