import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialMetric {
  value: string;
  label: string;
}

interface Testimonial {
  initials: string;
  avatarBgClass: string;
  name: string;
  title: string;
  rating: number;
  quote: string;
  metrics: TestimonialMetric[];
}

const testimonialsData: Testimonial[] = [
  {
    initials: "MJ",
    avatarBgClass: "bg-purple-600",
    name: "Michael Johnson",
    title: "CEO, TechFlow Solutions",
    rating: 5,
    quote:
      '"Our website was a disaster - slow, ugly, and converting at 0.8%. WebOptimize Pro completely transformed it. We now convert at 4.2% and our revenue increased by 312% in just 3 months. Best investment we\'ve made."',
    metrics: [
      { value: "+312%", label: "Revenue Increase" },
      { value: "4.2%", label: "Conversion Rate" },
    ],
  },
  {
    initials: "SM",
    avatarBgClass: "bg-blue-600",
    name: "Sarah Martinez",
    title: "Founder, Bloom Garden",
    rating: 5,
    quote:
      '"I came across an ad about how much a good website can impact sales, so I gave it a shot — and honestly, I\'m blown away. The difference was almost instant. Our sales jumped, and I only wish we had done this sooner!"',
    metrics: [
      { value: "+50", label: "New Customers/Month" },
      { value: "7x", label: "ROI Increase" },
    ],
  },
  {
    initials: "RK",
    avatarBgClass: "bg-indigo-600",
    name: "Robert Kim",
    title: "Owner, Premium Dental Care",
    rating: 5,
    quote:
      '"Our old website looked like it was from 2005 and we were losing patients to competitors. The new site is stunning and professional. Online bookings increased drastically and we\'re booked solid for months."',
    metrics: [
      { value: "+430%", label: "Online Bookings" },
      { value: "95%", label: "Mobile Score" },
    ],
  },
];

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
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 text-green-500" fill="currentColor" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300"
          fill="none"
        />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <div className="pb-16 sm:pb-16 md:pb-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
            Don't Take Our Word for It
          </h2>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Hear It From Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-4xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar
                    className={`h-12 w-12 sm:h-14 sm:w-14 text-xl sm:text-2xl flex items-center justify-center ${testimonial.avatarBgClass}`}
                  >
                    <AvatarFallback className="text-white bg-transparent flex items-center justify-center w-full h-full">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-base sm:text-xl text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                "{testimonial.quote}"
              </p>
              <hr className="my-4 border-gray-200" />
              <div className="grid grid-cols-2 gap-4 text-center sm:text-left">
                {testimonial.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex}>
                    <p className="text-base sm:text-2xl font-bold text-green-600">
                      {metric.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
