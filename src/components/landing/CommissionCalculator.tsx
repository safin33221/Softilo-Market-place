'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Calculator, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export function CommissionCalculator() {
  const [salesAmount, setSalesAmount] = useState<number>(50000);

  const commission = Math.round(salesAmount * (siteConfig.commissionRate / 100));
  const sellerEarnings = salesAmount - commission;

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
            <Calculator className="w-3.5 h-3.5" />
            <span>স্বচ্ছ ও নিরাপদ হিসাব</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            কত টাকা বিক্রয় করলে কত আয় করবেন?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            কোনো গোপন চার্জ নেই। শুধুমাত্র পণ্য কাস্টমারের কাছে সফল ডেলিভারি হওয়ার পর মাত্র {siteConfig.commissionRate}% প্ল্যাটফর্ম কমিশন।
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Slider input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sales-slider" className="text-sm font-semibold text-slate-700">
                আপনার মাসিক সম্ভাব্য বিক্রয়:
              </label>
              <span className="text-2xl font-black text-slate-900">
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
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>৳১০,০০০</span>
              <span>৳২,৫০,০০০</span>
              <span>৳৫,০০,০০০+</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500">মাসিক সাবস্ক্রিপশন ফি</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">৳০</p>
              <p className="text-[11px] text-slate-400 mt-1">আজীবন সম্পূর্ণ বিনামূল্যে</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500">{siteConfig.name} কমিশন ({siteConfig.commissionRate}%)</p>
              <p className="text-2xl font-black text-slate-700 mt-1">
                ৳{commission.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">শুধুমাত্র সফল ডেলিভারিতে</p>
            </div>

            <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-md shadow-emerald-600/20">
              <p className="text-xs text-emerald-100">আপনার নেট প্রফিট (৯৫%)</p>
              <p className="text-2xl font-black text-white mt-1">
                ৳{sellerEarnings.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-100 mt-1">সরাসরি আপনার ওয়ালেটে জমা</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/onboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow hover:shadow-md transition"
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

