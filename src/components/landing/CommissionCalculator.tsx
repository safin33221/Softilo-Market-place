'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState<number>(50000);

  const commission = Math.round(salesAmount * (siteConfig.commissionRate / 100));
  const sellerEarnings = salesAmount - commission;

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>স্বচ্ছ ও নিরাপদ আয়ের হিসাব</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            কত টাকা বিক্রয় করলে কত আয় করবেন?
          </h2>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            কোনো প্রকার লুকানো চার্জ বা মাসিক ফি নেই। শুধুমাত্র কাস্টমারের সফল ডেলিভারি নিশ্চিত হলেই মাত্র {siteConfig.commissionRate}% কমিশন।
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xl shadow-slate-900/5">
          {/* Slider input */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label htmlFor="sales-slider" className="text-sm font-bold text-slate-800">
                আপনার সম্ভাব্য মাসিক বিক্রয়:
              </label>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                ৳{salesAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <input
              id="sales-slider"
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={salesAmount}
              onChange={(e) => setSalesAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition"
            />

            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>৳১০,০০০</span>
              <span>৳২,৫০,০০০</span>
              <span>৳৫,০০,০০০+</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
            {/* Card 1: Subscription */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">মাসিক ফিক্সড ফি</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">৳০</p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">আজীবন সম্পূর্ণ ফ্রি</p>
            </div>

            {/* Card 2: Platform Commission */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                প্ল্যাটফর্ম ফি ({siteConfig.commissionRate}%)
              </p>
              <p className="text-3xl font-extrabold text-slate-800 mt-2 font-mono">
                ৳{commission.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">শুধুমাত্র সফল ডেলিভারিতে</p>
            </div>

            {/* Card 3: Net Seller Earnings */}
            <div className="bg-emerald-600 text-white p-5 rounded-xl shadow-lg shadow-emerald-600/20 border border-emerald-500">
              <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
                আপনার নেট লাভ (৯৫%)
              </p>
              <p className="text-3xl font-extrabold text-white mt-2 font-mono">
                ৳{sellerEarnings.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-100 mt-1 font-medium">সরাসরি ওয়ালেটে রিসিভ করুন</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/onboard"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>এখনই দোকান খুলে ব্যবসা শুরু করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

