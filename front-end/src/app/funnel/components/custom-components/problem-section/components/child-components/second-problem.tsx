import type React from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DevicePerformance {
  device: "desktop" | "mobile";
  grade: string;
  score: number; // 0-100
  status: "excellent" | "good" | "needs-improvement" | "critical";
  icon: React.ReactNode;
}

const performanceData: DevicePerformance[] = [
  {
    device: "desktop",
    grade: "B",
    score: 75,
    status: "needs-improvement",
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    device: "mobile",
    grade: "F",
    score: 25,
    status: "critical",
    icon: <Smartphone className="w-4 h-4" />,
  },
];

const getStatusConfig = (status: DevicePerformance["status"]) => {
  switch (status) {
    case "excellent":
      return {
        label: "Excellent",
        badgeClass: "bg-green-100 text-green-800 hover:bg-green-100",
        barClass: "bg-green-500",
      };
    case "good":
      return {
        label: "Good",
        badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        barClass: "bg-blue-500",
      };
    case "needs-improvement":
      return {
        label: "Improvements needed",
        badgeClass: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        barClass: "bg-orange-500",
      };
    case "critical":
      return {
        label: "Critical !!!",
        badgeClass: "bg-red-100 text-red-800 hover:bg-red-100",
        barClass: "bg-red-500",
      };
  }
};

export function PerformanceAudit() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img src="/problem2.png" alt="Rating Dashboard" />
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="w-full max-w-[240px] space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {performanceData.map((item) => {
            const statusConfig = getStatusConfig(item.status);

            return (
              <div
                key={item.device}
                className="bg-white border-2 border-gray-300 rounded-lg p-3 space-y-2"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    {item.device}
                  </span>
                  <div className="text-gray-400">{item.icon}</div>
                </div>

                {/* Grade and Progress */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {item.grade}
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${statusConfig.barClass}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Badges */}
        <div className="grid grid-cols-2 gap-3">
          {performanceData.map((item) => {
            const statusConfig = getStatusConfig(item.status);

            return (
              <div key={`${item.device}-badge`} className="flex justify-center">
                <Badge
                  variant="secondary"
                  className={`text-xs px-2 py-1 ${statusConfig.badgeClass}`}
                >
                  {statusConfig.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
