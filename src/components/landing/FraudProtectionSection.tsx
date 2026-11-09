import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FraudProtectionSection() {
  return (
    <section id="fraud-protection" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>রিটার্ন লস প্রতিরোধ প্রযুক্তি</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              অর্ডার পাঠানোর আগেই জানুন <br className="hidden sm:inline" />
              <span className="text-rose-600">কাস্টমার পার্সেল রিসিভ করবে কি না!</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              অনলাইন বিজনেসে সেলারদের সবচেয়ে বড় ক্ষতি হয় ভুয়া অর্ডার ও পার্সেল রিটার্নে। সফটইলোতে প্রতিটি অর্ডারের সাথে কাস্টমারের ফোন নম্বরের পূর্ববর্তী কুরিয়ার হিস্ট্রি লাইভ প্রদর্শিত হয়।
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                <p className="text-sm text-slate-700"><strong>হাই ডেলিভারি রেট বায়ার:</strong> ৮০% এর বেশি পার্সেল রিসিভ করা নির্ভরযোগ্য ক্রেতা।</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">!</div>
                <p className="text-sm text-slate-700"><strong>মিডিয়াম রিস্ক বায়ার:</strong> ৬০-৮০% সাকসেস রেট—পার্সেল পাঠানোর আগে ফোনে কনফার্ম করার অ্যালার্ট।</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                <p className="text-sm text-slate-700"><strong>হাই ফ্রড রিস্ক বায়ার:</strong> বারবার পার্সেল ক্যানসেল বা রিটার্ন করা ভুয়া কাস্টমার স্বয়ংক্রিয়ভাবে চিহ্নিত।</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/onboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition"
              >
                <span>ফ্রি মার্চেন্ট অ্যাকাউন্ট খুলুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Interactive Badges */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              লাইভ অর্ডার ফ্রড স্কোর প্রিভিউ
            </h3>

            {/* Safe Card */}
            <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">তানভীর আহমেদ</span>
                  <span className="text-xs text-slate-400">01712-XXXXXX</span>
                </div>
                <p className="text-xs text-slate-500">ঢাকা মেট্রো • অর্ডার মান ৳১,৫০০</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ৯৪% সেফ বায়ার
                </span>
                <p className="text-[10px] text-emerald-600 mt-1 font-semibold">নিরাপদে পার্সেল পাঠান</p>
              </div>
            </div>

            {/* Warning Card */}
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">সাদিয়া রহমান</span>
                  <span className="text-xs text-slate-400">01823-XXXXXX</span>
                </div>
                <p className="text-xs text-slate-500">চট্টগ্রাম • অর্ডার মান ৳২,২০০</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  ৬৭% মিডিয়াম রিস্ক
                </span>
                <p className="text-[10px] text-amber-700 mt-1 font-medium">কল দিয়ে কনফার্ম করুন</p>
              </div>
            </div>

            {/* High Risk Card */}
            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">অজ্ঞাত ক্রেতা</span>
                  <span className="text-xs text-slate-400">01945-XXXXXX</span>
                </div>
                <p className="text-xs text-slate-500">গাজীপুর • অর্ডার মান ৳৮৫০</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  ২৫% হাই ফ্রড রিস্ক
                </span>
                <p className="text-[10px] text-rose-700 mt-1 font-medium">অগ্রিম ডেলিভারি চার্জ নিন</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

