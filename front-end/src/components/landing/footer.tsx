import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerNavLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Website Audits", href: "#" },
      { label: "Design Overhaul", href: "#" },
      { label: "CRO", href: "#" },
      { label: "Mobile Optimization", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "#" },
      { label: "Guides", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socialMediaLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div className="lg:col-span-2 mb-6 md:mb-0">
            <Link
              href="/"
              className="text-3xl font-bold text-purple-700 mb-4 inline-block"
            >
              Logo
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Transforming websites into high-converting revenue machines.
            </p>
          </div>

          {/* Navigation Links */}
          {footerNavLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-800 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-purple-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-300 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-600 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} YourBrand Inc. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            {socialMediaLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
