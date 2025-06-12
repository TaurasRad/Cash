import { AlarmClock, Brain, Ban, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function ProblemPointsSection() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            {/* <div>
              <Badge>Platform</Badge>
            </div> */}
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Most business websites are silent profit killers.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-300 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <AlarmClock className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">
                  Boring Design That Repels Customers
                </h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Your website looks like it was built in 2010. Visitors leave
                  within 3 seconds because it screams &quot;unprofessional&quot;
                  and &quot;outdated.&quot;
                </p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md  aspect-square p-6 flex justify-between flex-col">
              <Brain className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">
                  Confusing User Experience
                </h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Visitors can&apos;t find what they&apos;re looking for. Poor
                  navigation and unclear messaging means lost sales and
                  frustrated customers.
                </p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md aspect-square p-6 flex justify-between flex-col">
              <Ban className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">
                  Zero Conversion Strategy
                </h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Your website gets traffic but no sales. Without proper
                  conversion optimization, you&apos;re just paying for expensive
                  window shoppers.
                </p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <Smartphone className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Mobile Disaster</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  70% of web traffic is mobile, but your site looks broken on
                  phones. You&apos;re literally turning away the majority of
                  your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProblemPointsSection };
