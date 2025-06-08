"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function PostPurchaseContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 max-w-md w-full text-center border border-white/20">
        {isSuccess ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-2 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Payment Successful!
              </h2>
              <p className="text-lg text-gray-200 mb-4">
                Thank you for your purchase. Your website optimization is
                underway!
              </p>
              <ul className="text-left text-gray-100 mb-6 space-y-2">
                <li>• You&apos;ll receive an email with next steps soon.</li>
                <li>• Our team will reach out if we need more info.</li>
                <li>
                  • Check spam folder if you don&apos;t see it in your inbox.
                </li>
              </ul>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : isCanceled ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="w-20 h-20 text-red-400 mx-auto mb-2 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Payment Canceled
              </h2>
              <p className="text-lg text-gray-200 mb-4">
                Your payment was not completed. If this was a mistake, you can
                try again.
              </p>
              <Link
                href="/web-analysis"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                Return to Checkout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/logo.png"
                width={80}
                height={80}
                alt="Logo"
                className="mx-auto mb-2"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Post Purchase
              </h2>
              <p className="text-gray-200 mb-4">
                We couldn&apos;t determine your payment status. Please check
                your email or contact support if you have questions.
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
