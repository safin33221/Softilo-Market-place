import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowRight, Store, Sparkles, ShieldCheck } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>আজই যুক্ত হোন সফল ই-কমার্স সেলারদের কাতারে</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.25]">
          আপনার অনলাইন বিজনেসকে নিয়ে যান এক নতুন উচ্চতায়
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          {siteConfig.name}-এ আজই আপনার ফ্রি মার্চেন্ট একাউন্ট খুলুন এবং কোনো মাসিক ফিক্সড খরচ ছাড়াই স্মার্ট অর্গানাইজড বিজনেস পরিচালনা করুন।
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/onboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <Store className="w-5 h-5 text-slate-950" />
            <span>বিনামূল্যে দোকান খুলুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-white font-semibold text-base transition-all border border-slate-700 hover:border-slate-600"
          >
            <span>সেলার ড্যাশবোর্ড লগইন</span>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>কোনো ক্রেডিট কার্ড বা অগ্রিম পেমেন্টের প্রয়োজন নেই</span>
        </div>
      </div>
    </section>
  );
}

