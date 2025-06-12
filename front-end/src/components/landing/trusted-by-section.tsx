import React from "react";

const logos = [
  {
    name: "Shopify",
    src: "/shopify-2.svg",
  },
  {
    name: "WooCommerce",
    src: "/woocommerce.svg",
  },
  {
    name: "HTML5",
    src: "/html-1.svg",
  },
  {
    name: "WordPress",
    src: "/wordpress-icon-1 (1).svg",
  },
  {
    name: "Wix",
    src: "/wix-logo-1.svg",
  },
  {
    name: "BigCommerce",
    src: "/bigcommerce-1.svg",
  },
];

const TrustedBySection: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-100 to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-100 to-transparent"></div>

          {/* Scrolling container */}
          <div className="flex space-x-16 animate-scroll">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center group"
              >
                <div className="w-24 h-12 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-12 max-w-full grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center group"
              >
                <div className="w-24 h-12 flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-12 max-w-full grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h2
            id="trusted-by-heading"
            className="text-center text-2xl sm:text-xl font-normal text-muted-foreground tracking-wide" // Adjusted styling for a more refined look
          >
            Trusted by Leading Companies Worldwide
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TrustedBySection;
