import { AlarmClock, Brain, Ban, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProblemComponent from "./components/problem-component";
import { problemsData } from "./components/problems";

function ProblemPointsSection() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-2xl md:text-5xl max-w-2xl text-left">
                Most business websites are silent profit killers.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough.
              </p>
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto space-x-6 py-10 justify-between hide-scrollbar">
          {problemsData.map((problem, index) => (
            <ProblemComponent
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            >
              {problem.content}
            </ProblemComponent>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ProblemPointsSection };
