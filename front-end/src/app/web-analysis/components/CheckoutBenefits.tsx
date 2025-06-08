import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutBenefits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="block md:static md:mb-6"
    >
      <div className="bg-blue-50 rounded-lg p-4 space-y-2 border border-blue-100">
        <h3 className="font-semibold text-blue-900">What you&apos;ll get:</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Fully optimized website code</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>SEO improvements</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Performance enhancements</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Modern design updates</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
