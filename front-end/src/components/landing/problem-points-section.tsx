import { Star, StarHalf } from "lucide-react";

interface ProblemPoint {
  emoji: string; // Changed from icon component to emoji string
  iconColor: keyof typeof iconColorMap; // Now a key, not a class
  title: string;
  description: string;
}

const StarRating = ({
  rating,
  totalStars = 5,
}: {
  rating: number;
  totalStars?: number;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          stroke="currentColor"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          stroke="currentColor"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
        />
      ))}
    </div>
  );
};

const iconColorMap = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

const problemPointsData: ProblemPoint[] = [
  {
    emoji: "😴", // Sleeping Face emoji
    iconColor: "red",
    title: "Boring Design That Repels Customers",
    description:
      'Your website looks like it was built in 2010. Visitors leave within 3 seconds because it screams "unprofessional" and "outdated."',
  },
  {
    emoji: "🤔", // Thinking Face emoji
    iconColor: "yellow",
    title: "Confusing User Experience",
    description:
      "Visitors can't find what they're looking for. Poor navigation and unclear messaging means lost sales and frustrated customers.",
  },
  {
    emoji: "🚫", // Prohibited Sign emoji (for Zero Conversion Strategy)
    iconColor: "green",
    title: "Zero Conversion Strategy",
    description:
      "Your website gets traffic but no sales. Without proper conversion optimization, you're just paying for expensive window shoppers.",
  },
  {
    emoji: "📱", // Mobile Phone emoji
    iconColor: "blue",
    title: "Mobile Disaster",
    description:
      "70% of web traffic is mobile, but your site looks broken on phones. You're literally turning away the majority of your audience.",
  },
  {
    emoji: "📉", // Chart Decreasing emoji
    iconColor: "purple",
    title: "Outdated CRO Practices",
    description:
      "You're running 2015 tactics in a 2025 market. Stale strategies won't convert modern buyers — you're optimizing for a customer that no longer exists.",
  },
];

export default function ProblemPointsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
      <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
        {/* <div
          className="flex items-center bg-white rounded-2xl shadow-sm px-6 py-3 space-x-6 border border-gray-200"
          style={{ minHeight: "60px" }}
        >
          <span className="font-bold text-lg text-gray-900">Excellent</span>
          <span className="flex flex-col items-center justify-center">
            <span className="flex items-center space-x-1">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64.11 50.3"
                className="w-full h-20"
                aria-label="Trustpilot 5 stars"
              >
                <style type="text/css">{`.st0{fill:#191919;}.st1{fill:#00B67A;}.st2{fill:#005128;}.st3{fill:#DCDCE6;}.st4{fill:#FFFFFF;}`}</style>
                <g>
                  <polygon
                    className="st1"
                    points="18.77,17.59 14.11,17.59 12.67,13.15 11.22,17.59 6.56,17.58 10.33,20.33 8.89,24.76 12.67,22.02 16.44,24.76 15,20.33 18.77,17.59"
                  />
                  <polygon
                    className="st2"
                    points="15.32,21.33 15,20.33 12.67,22.02"
                  />
                </g>
                <rect
                  x="6.56"
                  y="27.59"
                  className="st1"
                  width="9.56"
                  height="9.56"
                />
                <rect
                  x="16.91"
                  y="27.59"
                  className="st1"
                  width="9.56"
                  height="9.56"
                />
                <rect
                  x="27.27"
                  y="27.59"
                  className="st1"
                  width="9.56"
                  height="9.56"
                />
                <rect
                  x="37.63"
                  y="27.59"
                  className="st1"
                  width="9.56"
                  height="9.56"
                />
                <rect
                  x="47.99"
                  y="27.59"
                  className="st3"
                  width="9.56"
                  height="9.56"
                />
                <polygon
                  className="st1"
                  points="47.99,27.59 57.56,27.59 57.52,37.15 47.99,37.15"
                />
                <path
                  className="st4"
                  d="M11.34,34.03l1.45-0.37l0.61,1.87L11.34,34.03z M14.68,31.61h-2.56l-0.79-2.41l-0.79,2.41H7.99l2.07,1.49l-0.79,2.41l2.07-1.49l1.27-0.92L14.68,31.61L14.68,31.61L14.68,31.61L14.68,31.61z"
                />
                <path
                  className="st4"
                  d="M21.7,34.03l1.45-0.37l0.61,1.87L21.7,34.03z M25.04,31.61h-2.56L21.7,29.2l-0.79,2.41h-2.56l2.07,1.49l-0.79,2.41l2.07-1.49l1.27-0.92L25.04,31.61L25.04,31.61L25.04,31.61L25.04,31.61z"
                />
                <path
                  className="st4"
                  d="M32.06,34.03l1.45-0.37l0.61,1.87L32.06,34.03z M35.4,31.61h-2.56l-0.79-2.41l-0.79,2.41h-2.56l2.07,1.49l-0.79,2.41l2.07-1.49l1.28-0.92L35.4,31.61L35.4,31.61L35.4,31.61L35.4,31.61z"
                />
                <path
                  className="st4"
                  d="M42.41,34.03l1.45-0.37l0.61,1.87L42.41,34.03z M45.76,31.61H43.2l-0.79-2.41l-0.79,2.41h-2.56l2.07,1.49l-0.79,2.41l2.07-1.49l1.28-0.92L45.76,31.61L45.76,31.61L45.76,31.61L45.76,31.61z"
                />
                <path
                  className="st4"
                  d="M52.77,34.03l1.45-0.37l0.61,1.87L52.77,34.03z M56.12,31.61h-2.56l-0.79-2.41l-0.79,2.41h-2.56l2.07,1.49l-0.79,2.41l2.07-1.49l1.28-0.92L56.12,31.61L56.12,31.61L56.12,31.61L56.12,31.61z"
                />
              </svg>
            </span>
          </span>
          <span className="text-gray-500 text-base font-normal">
            <span className="text-green-600 font-bold text-xl">436</span>{" "}
            reviews on{" "}
            <span className="text-green-600 font-bold text-xl">Trustpilot</span>
          </span>
        </div>*/}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
            Most business websites are silent profit killers.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Here's what's probably wrong with yours:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 max-w-3xl mx-auto">
          {problemPointsData.map((point, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-3 sm:p-6 md:p-6 rounded-3xl md:rounded-3xl flex flex-col shadow-xl"
            >
              <div className="flex flex-row items-center space-x-3 md:space-x-5 mb-1">
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${
                    iconColorMap[point.iconColor]
                  }`}
                >
                  <span
                    className="text-xl sm:text-2xl md:text-3xl"
                    role="img"
                    aria-label={point.title.split(" ")[0] + " emoji"}
                  >
                    {point.emoji}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                  {point.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
