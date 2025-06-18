import React, { useState } from "react";
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

interface CategoryTestimonials {
  category: string;
  testimonials: Testimonial[];
}

const testimonialsByCategory: CategoryTestimonials[] = [
  {
    category: "Ecommerce",
    testimonials: [
      {
        initials: "MJ",
        avatarBgClass: "bg-purple-600",
        name: "Michael Johnson",
        title: "CEO, TechFlow Solutions",
        rating: 5,
        quote:
          "&quot;Our website was a disaster - slow, ugly, and converting at 0.8%. WebOptimize Pro completely transformed it. We now convert at 4.2% and our revenue increased by 312% in just 3 months. Best investment we&apos;ve made.&quot;",
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
          "&quot;I came across an ad about how much a good website can impact sales, so I gave it a shot — and honestly, I&apos;m blown away. The difference was almost instant. Our sales jumped, and I only wish we had done this sooner!&quot;",
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
          "&quot;Our old website looked like it was from 2005 and we were losing patients to competitors. The new site is stunning and professional. Online bookings increased drastically and we&apos;re booked solid for months.&quot;",
        metrics: [
          { value: "+430%", label: "Online Bookings" },
          { value: "95%", label: "Mobile Score" },
        ],
      },
      {
        initials: "AL",
        avatarBgClass: "bg-green-600",
        name: "Anna Lee",
        title: "COO, FreshMart",
        rating: 5,
        quote:
          "&quot;We saw a 200% increase in repeat customers after our site redesign. The checkout is so much smoother now!&quot;",
        metrics: [
          { value: "+200%", label: "Repeat Customers" },
          { value: "1.5s", label: "Avg. Load Time" },
        ],
      },
    ],
  },
  {
    category: "EdTech",
    testimonials: [
      {
        initials: "JS",
        avatarBgClass: "bg-pink-600",
        name: "Julia Smith",
        title: "CTO, Learnify",
        rating: 5,
        quote:
          "&quot;Our student engagement doubled after the new platform launch. The feedback from teachers and students has been overwhelmingly positive.&quot;",
        metrics: [
          { value: "+100%", label: "Engagement" },
          { value: "24/7", label: "Uptime" },
        ],
      },
      {
        initials: "DP",
        avatarBgClass: "bg-yellow-600",
        name: "David Park",
        title: "Founder, EduSpark",
        rating: 5,
        quote:
          "&quot;We needed a scalable solution for our online courses. The new site handles thousands of users with zero issues.&quot;",
        metrics: [
          { value: "0", label: "Downtime" },
          { value: "3x", label: "User Growth" },
        ],
      },
      {
        initials: "MC",
        avatarBgClass: "bg-red-600",
        name: "Maria Chen",
        title: "Director, KidsLearn",
        rating: 5,
        quote:
          "&quot;Parents love the new interface. Our NPS score shot up and we get daily compliments!&quot;",
        metrics: [
          { value: "+40", label: "NPS Score" },
          { value: "+2k", label: "New Signups" },
        ],
      },
      {
        initials: "TR",
        avatarBgClass: "bg-teal-600",
        name: "Tommy Rivera",
        title: "CEO, TutorPro",
        rating: 5,
        quote:
          "&quot;The mobile experience is flawless. Our app downloads and course completions are at an all-time high.&quot;",
        metrics: [
          { value: "+300%", label: "App Downloads" },
          { value: "+120%", label: "Course Completion" },
        ],
      },
    ],
  },
  {
    category: "Saas",
    testimonials: [
      {
        initials: "LS",
        avatarBgClass: "bg-cyan-600",
        name: "Liam Scott",
        title: "Product Lead, CloudSync",
        rating: 5,
        quote:
          "&quot;Our churn rate dropped dramatically. The onboarding is so much better and our support tickets are down!&quot;",
        metrics: [
          { value: "-60%", label: "Churn Rate" },
          { value: "-40%", label: "Support Tickets" },
        ],
      },
      {
        initials: "EK",
        avatarBgClass: "bg-orange-600",
        name: "Emily Kim",
        title: "CEO, Taskly",
        rating: 5,
        quote:
          "&quot;We launched new features faster than ever. Our users are happier and our MRR is up!&quot;",
        metrics: [
          { value: "+25%", label: "MRR Growth" },
          { value: "2x", label: "Feature Velocity" },
        ],
      },
      {
        initials: "BW",
        avatarBgClass: "bg-lime-600",
        name: "Ben White",
        title: "COO, InvoicePro",
        rating: 5,
        quote:
          "&quot;The analytics dashboard is a game changer. We make decisions so much faster now.&quot;",
        metrics: [
          { value: "4x", label: "Faster Decisions" },
          { value: "+80%", label: "User Retention" },
        ],
      },
      {
        initials: "AP",
        avatarBgClass: "bg-fuchsia-600",
        name: "Ava Patel",
        title: "Founder, Subscriptly",
        rating: 5,
        quote:
          "&quot;Our subscriptions doubled in 6 months. The new site is beautiful and easy to use.&quot;",
        metrics: [
          { value: "+100%", label: "Subscriptions" },
          { value: "1.2s", label: "Avg. Response" },
        ],
      },
    ],
  },
  {
    category: "FinTech",
    testimonials: [
      {
        initials: "JG",
        avatarBgClass: "bg-violet-600",
        name: "James Green",
        title: "CFO, FinEdge",
        rating: 5,
        quote:
          "&quot;Security and speed were our top priorities. The new platform delivers both, and our clients trust us more than ever.&quot;",
        metrics: [
          { value: "+99.99%", label: "Uptime" },
          { value: "+70%", label: "Client Trust" },
        ],
      },
      {
        initials: "HS",
        avatarBgClass: "bg-emerald-600",
        name: "Hannah Singh",
        title: "CEO, PayWave",
        rating: 5,
        quote:
          "&quot;Our transaction volume skyrocketed. The new dashboard is intuitive and our fraud rate is down!&quot;",
        metrics: [
          { value: "+400%", label: "Transactions" },
          { value: "-80%", label: "Fraud Rate" },
        ],
      },
      {
        initials: "OM",
        avatarBgClass: "bg-sky-600",
        name: "Omar Malik",
        title: "Founder, QuickFunds",
        rating: 5,
        quote:
          "&quot;We process payments faster and with fewer errors. Our support calls have dropped significantly.&quot;",
        metrics: [
          { value: "-70%", label: "Support Calls" },
          { value: "1s", label: "Avg. Payment Time" },
        ],
      },
      {
        initials: "CR",
        avatarBgClass: "bg-rose-600",
        name: "Chloe Reed",
        title: "COO, SecurePay",
        rating: 5,
        quote:
          "&quot;Our compliance checks are automated and our onboarding is seamless. Clients love the new experience!&quot;",
        metrics: [
          { value: "100%", label: "Compliance" },
          { value: "+60%", label: "Faster Onboarding" },
        ],
      },
    ],
  },
];

const categories = testimonialsByCategory.map((cat) => cat.category);

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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const currentTestimonials =
    testimonialsByCategory.find((cat) => cat.category === selectedCategory)
      ?.testimonials || [];

  return (
    <div className="relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-5xl  font-bold ">
            Don&apos;t Take Our Word for It
          </h2>
          <h2 className="text-2xl sm:text-5xl  font-bold">
            Hear It From Our Clients
          </h2>
        </div>

        {/* Trustpilot Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8">
          <span className="font-semibold text-gray-800">Excellent</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-green-500"
                fill="currentColor"
              />
            ))}
          </div>
          <span className="text-gray-700 font-medium">436 reviews on</span>
          <span className="flex items-center gap-1 font-semibold text-gray-800">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#00B67A" />
              <path
                d="M13.5 6.75L8.25 12L4.5 8.25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Trustpilot
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border transition font-semibold text-base mb-2
                ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-white text-gray-800 border-orange-300 hover:bg-orange-50"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col h-full"
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
                {testimonial.quote}
              </p>
              <hr className="my-4 border-gray-200" />
              <div className="grid grid-cols-2 gap-4 text-center sm:text-left mt-auto">
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
