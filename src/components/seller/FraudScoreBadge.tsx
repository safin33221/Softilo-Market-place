'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface FraudScoreBadgeProps {
  totalDelivered?: number;
  totalReturned?: number;
  // If ratio is directly provided as percentage (0 to 100)
  directRatio?: number;
}

export function FraudScoreBadge({
  totalDelivered = 0,
  totalReturned = 0,
  directRatio,
}: FraudScoreBadgeProps) {
  let ratio = 100;
  const total = totalDelivered + totalReturned;

  if (directRatio !== undefined) {
    ratio = directRatio;
  } else if (total > 0) {
    ratio = Math.round((totalDelivered / total) * 100);
  } else {
    // New customer without prior history
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        <span>নতুন কাস্টমার (১ম অর্ডার)</span>
      </span>
    );
  }

  if (ratio >= 85) {
    return (
      <span
        title={`মোট ${total} টির মধ্যে ${totalDelivered} টি পার্সেল গ্রহণ করেছেন`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{ratio}% ডেলিভারি সাকসেস (Safe to Ship)</span>
      </span>
    );
  }

  if (ratio >= 50) {
    return (
      <span
        title={`মোট ${total} টির মধ্যে ${totalDelivered} টি রিসিভ, ${totalReturned} টি রিটার্ন`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{ratio}% সাকসেস (মাঝারি ঝুঁকি)</span>
      </span>
    );
  }

  return (
    <span
      title={`হাই রিটার্ন হিস্ট্রি: ${total} টির মধ্যে ${totalReturned} টি রিটার্ন হয়েছে`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs animate-pulse"
    >
      <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
      <span>{ratio}% সাকসেস (High Risk - কল দিয়ে কনফার্ম করুন)</span>
    </span>
  );
}

