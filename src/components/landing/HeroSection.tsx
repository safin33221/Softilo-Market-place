import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 to-teal-200/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>কোনো মাসিক চার্জ নেই • শুধুই বিক্রয়ে {siteConfig.commissionRate}% কমিশন</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            বাংলাদেশের মার্চেন্টদের জন্য সবচেয়ে লাভজনক{' '}
            <span className="text-emerald-600">সেলার প্ল্যাটফর্ম</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {siteConfig.name}-এ ২ মিনিটে আপনার অনলাইন শপ খুলুন। অটোমেটিক কুরিয়ার ফ্রড চেকার, ১-ক্লিকে Steadfast ও Pathao বুকিং এবং দ্রুত ওয়ালেট উইথড্র।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link
              href="/onboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <span>ফ্রি তে দোকান খুলুন</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300 shadow-sm transition"
            >
              <span>সেলার ড্যাশবোর্ড লগইন</span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>জিরো সাবস্ক্রিপশন ফি</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>অটো কুরিয়ার ফ্রড চেক</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>১-ক্লিকে কুরিয়ার বুকিং</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Dashboard Visual Mock */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-400 font-mono ml-2">seller.{siteConfig.domain}/dashboard</span>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-semibold">
              মার্চেন্ট প্রিভিউ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500">মোট বিক্রয়</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">৳১,৮৫,৪০০</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">↑ ২৮% এই মাসে বৃদ্ধি</p>
            </div>
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-700 font-medium">উত্তোলনযোগ্য ব্যালেন্স</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">৳১,৭৬,১৩০</p>
              <p className="text-xs text-emerald-700 mt-1">৫% কমিশন বাদে সরাসরি আয়</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500">ফ্রড সেভড অর্ডার</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">১৪ টি</p>
              <p className="text-xs text-slate-500 mt-1">৳১৪,২০০ লস সেভ হয়েছে</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

