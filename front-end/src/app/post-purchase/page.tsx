"use client";
import { Suspense } from "react";
import PostPurchaseContent from "./PostPurchaseContent";

export default function PostPurchasePage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <PostPurchaseContent />
    </Suspense>
  );
}
