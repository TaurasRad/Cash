interface RatingData {
  score: number;
  maxScore: number;
  issues: number;
  updatesNeeded: number;
  tips: number;
}

const ratingData: RatingData = {
  score: 41,
  maxScore: 100,
  issues: 34,
  updatesNeeded: 7,
  tips: 14,
};

export function RatingDashboard() {
  const percentage = (ratingData.score / ratingData.maxScore) * 100;
  const radius = 70; // Radius of the semi-circle
  const circumference = Math.PI * radius; // Circumference of a full circle
  const semiCircleArc = circumference / 2; // Arc length of the semi-circle
  const strokeDashoffset = semiCircleArc * (1 - percentage / 100);

  // SVG dimensions
  const svgWidth = radius * 2 + 20; // Diameter + padding for stroke (10px on each side)
  const svgHeight = radius + 20; // Radius + padding for stroke (10px on top, 10px on bottom for path)

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img src="/problem3.png" alt="Rating Dashboard" />
    </div>
  );
}
