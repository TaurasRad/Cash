import React from "react";
import Image from "next/image";
import CostOfDoingNothing from "./cost-of-doing-nothing";

const trustLogos = [
  { src: "/funnel/trust/harvard.png", alt: "Harvard" },
  { src: "/funnel/trust/stanford.png", alt: "Stanford" },
  { src: "/funnel/trust/mit.png", alt: "MIT" },
  { src: "/funnel/trust/cambridge.png", alt: "Cambridge" },
];

const TrustLogos = () => (
  <div className="max-w-2xl mx-auto w-[90%] mt-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {trustLogos.map((logo) => (
        <div
          key={logo.alt}
          className="flex justify-center items-center bg-gray-100 p-4 rounded-lg"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={40}
            className="object-contain h-10 w-auto"
          />
        </div>
      ))}
    </div>
  </div>
);

const CostWithTrust = () => {
  return (
    <div>
      <CostOfDoingNothing />
      <TrustLogos />
    </div>
  );
};

export default CostWithTrust;
