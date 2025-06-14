import type { ReactNode } from "react";

interface ProblemComponentProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}

const CARD_WIDTH = "min-w-72 max-w-72"; // Example: 288px
const CARD_HEIGHT = "min-h-[420px] max-h-[420px]"; // Example: 420px
const CHILDREN_CONTAINER_HEIGHT = "h-32"; // Example: 128px

export default function ProblemComponent({
  icon,
  title,
  description,
  children,
}: ProblemComponentProps) {
  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col transition-transform duration-200 ease-in-out hover:shadow-xl ${CARD_WIDTH} ${CARD_HEIGHT}`}
    >
      <div className="inline-block p-3 border border-gray-200 rounded-lg mb-4 self-start">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 min-h-[2.5rem] break-words">
        {title}
      </h3>
      <p className="text-gray-500 text-sm mb-6 flex-grow">{description}</p>
      <div
        className={`border-2 border-black rounded-lg p-4 w-full ${CHILDREN_CONTAINER_HEIGHT} flex items-center justify-center`}
      >
        {children}
      </div>
    </div>
  );
}
