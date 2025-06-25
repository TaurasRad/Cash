import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <div className="px-4 py-6" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="sr-only">
        Customer Reviews
      </h2>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
      >
        <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="pl-1 sm:pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
            >
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < review.rating
                                ? "text-green-500 fill-green-500"
                                : "text-slate-300 fill-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700">
                        {review.name}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <CardTitle className="text-base sm:text-lg font-semibold mb-1 leading-tight">
                      {review.title}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-4">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
