import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowRight, Store, Sparkles } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-16 bg-emerald-700 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>আজই যুক্ত হোন হাজারো সফল সেলারের সাথে</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          আপনার ই-কমার্স বিজনেসকে নিয়ে যান এক নতুন উচ্চতায়
        </h2>

        <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
          {siteConfig.name}-এ আজই আপনার ফ্রি অনলাইন শপ খুলুন এবং প্রথম দিন থেকেই অর্ডার ম্যানেজমেন্ট শুরু করুন।
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-base shadow-xl transition transform hover:-translate-y-0.5"
          >
            <Store className="w-5 h-5" />
            <span>বিনামূল্যে দোকান খুলুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-base transition border border-emerald-600"
          >
            <span>সেলার ড্যাশবোর্ড লগইন</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

