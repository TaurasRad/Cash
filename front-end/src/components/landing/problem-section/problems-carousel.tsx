import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProblemComponent from "./components/problem-component";
import { problemsData } from "./components/problems";

export function ProblemsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-sm mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {problemsData.map((problem, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex justify-center">
              <ProblemComponent
                icon={problem.icon}
                title={problem.title}
                description={problem.description}
              >
                {problem.content}
              </ProblemComponent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
