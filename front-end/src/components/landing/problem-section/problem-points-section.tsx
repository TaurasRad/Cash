import { AlarmClock, Brain, Ban, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProblemComponent from "./components/problem-component";
import { problemsData } from "./components/problems";
import { ProblemsCarousel } from "./problems-carousel";

function ProblemPointsSection() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <div className="flex gap-2 flex-col items-center">
          <div className="flex flex-col">
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-center">
              Managing a small business today is already tough.
            </p>
          </div>
        </div>
        <div className="py-4">
          <ProblemsCarousel />
        </div>
      </div>
    </div>
  );
}

export { ProblemPointsSection };
