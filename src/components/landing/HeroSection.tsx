import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  PackageCheck,
  Lock,
  Wallet,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-slate-50/60 border-b border-slate-200/60">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Decorative radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill Tag with glowing pulse dot */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>জিরো মাসিক সাবস্ক্রিপশন ফি • সফল বিক্রয়ে মাত্র {siteConfig.commissionRate}% প্ল্যাটফর্ম ফি</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.25] sm:leading-[1.2]">
            বাংলাদেশের মার্চেন্টদের জন্য আধুনিক ও লাভজনক{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              সেলার প্ল্যাটফর্ম
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            মাত্র ২ মিনিটে আপনার ব্র্যান্ডেড অনলাইন স্টোর খুলুন। অটোমেটিক কুরিয়ার ফ্রড স্কোরিং, ১-ক্লিকে Steadfast ও Pathao কনসাইনমেন্ট তৈরি এবং সরাসরি ওয়ালেট পেআউট।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Link
              href="/onboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>ফ্রি তে দোকান খুলুন</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-300 hover:border-slate-400 shadow-xs transition-all"
            >
              <span>সেলার ড্যাশবোর্ড লগইন</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>জিরো ফিক্সড ফি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>রিয়েল-টাইম ফ্রড গার্ড</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>অটো কুরিয়ার ইন্টিগ্রেশন</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Component (macOS / SaaS Frame) */}
        <div className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 overflow-hidden transition-all">
          {/* macOS Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400/90" />
              <div className="w-3 h-3 rounded-full bg-amber-400/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>

            {/* Simulated Address Pill */}
            <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-white border border-slate-200/70 text-slate-500 font-mono text-xs shadow-2xs">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>https://seller.{siteConfig.domain}/dashboard</span>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              লাইভ প্রিভিউ
            </span>
          </div>

          {/* Dashboard Window Body */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Top Stat Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Total Sales */}
              <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/70 relative overflow-hidden group hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">মাসিক মোট বিক্রয়</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">৳১,৮৫,৪০০</p>
                  <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <span>↑ +২৮.৪%</span>
                    <span className="text-slate-400 font-normal">গত মাসের তুলনায়</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Available Wallet Balance */}
              <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/70 relative overflow-hidden group hover:bg-emerald-50/70 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">উত্তোলনযোগ্য ব্যালেন্স</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Wallet className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">৳১,৭৬,১৩০</p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">৯৫% নেট আয় • ১-ক্লিকে বিকাশ/ব্যাংক ক্যাশআউট</p>
                </div>
              </div>

              {/* Card 3: Fraud Saved Metric */}
              <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/70 relative overflow-hidden group hover:bg-slate-50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ফ্রড সেভড অর্ডার</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-tight">১৪ টি পার্সেল</p>
                  <p className="mt-1 text-xs font-medium text-slate-600">৳১৪,২০০ আনুমানিক রিটার্ন লস রোধ হয়েছে</p>
                </div>
              </div>
            </div>

            {/* Embedded Mini Live Activity Table */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden">
              <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>সাম্প্রতিক কুরিয়ার ও অর্ডার ট্র্যাকিং</span>
                <span className="text-[11px] text-emerald-700 font-semibold">অটো-সিঙ্কড Steadfast ও Pathao</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">অর্ডার #SF-9842 • প্রিমিয়াম জর্জেট গাউন</p>
                      <p className="text-[11px] text-slate-500">ক্রেতা: তানভীর আহমেদ • ধানমন্ডি, ঢাকা</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 font-bold text-[11px]">
                      ৯৬% সেফ বায়ার
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Steadfast: SF-38291</p>
                  </div>
                </div>

                <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50/50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">অর্ডার #SF-9841 • স্মার্ট ব্লুটুথ হেডসেট</p>
                      <p className="text-[11px] text-slate-500">ক্রেতা: ফারহানা হক • নাসিরাবাদ, চট্টগ্রাম</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 font-bold text-[11px]">
                      ইন কুরিয়ার
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Pathao: PT-90182</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

