import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Truck,
} from 'lucide-react';
import Link from 'next/link';

export function FraudProtectionSection() {
  const sampleChecks = [
    {
      name: 'তানভীর আহমেদ',
      phone: '01712-849XXX',
      location: 'ধানমন্ডি, ঢাকা',
      orderValue: '৳১,৫০০',
      deliveries: '৪২ টি সফল',
      returns: '১ টি ফেরত',
      score: '৯৬% সেফ বায়ার',
      status: 'SAFE',
      badgeClass: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
      actionText: 'নির্ভয়ে পার্সেল পাঠান',
      courierText: 'Steadfast & Pathao Verified',
    },
    {
      name: 'সাদিয়া রহমান',
      phone: '01823-712XXX',
      location: 'পাঁচলাইশ, চট্টগ্রাম',
      orderValue: '৳২,২০০',
      deliveries: '১২ টি সফল',
      returns: '৪ টি ফেরত',
      score: '৬৭% মিডিয়াম রিস্ক',
      status: 'WARNING',
      badgeClass: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
      actionText: 'ফোনে অর্ডার কনফার্ম করুন',
      courierText: 'রিটার্ন রেশিও ২৫%',
    },
    {
      name: 'অজ্ঞাত ক্রেতা (ফেক অর্ডার)',
      phone: '01945-381XXX',
      location: 'উত্তরা, ঢাকা',
      orderValue: '৳৩,৪০০',
      deliveries: '২ টি সফল',
      returns: '৯ টি ফেরত',
      score: '১৮% হাই ফ্রড রিস্ক',
      status: 'DANGER',
      badgeClass: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
      actionText: 'অগ্রিম কুরিয়ার চার্জ নিন',
      courierText: 'একাধিক কুরিয়ারে ব্লকড',
    },
  ];

  return (
    <section id="fraud-protection" className="py-20 sm:py-28 bg-slate-50/60 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200/70">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>রিটার্ন পার্সেল লস প্রতিরোধ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.25]">
              অর্ডার পাঠানোর আগেই জানুন{' '}
              <span className="text-rose-600">কাস্টমার পার্সেল রিসিভ করবে কি না!</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed font-normal">
              ই-কমার্সে সেলারদের সবচেয়ে বড় ক্ষতি হয় ফেইক অর্ডার ও কুরিয়ার রিটার্ন খরচে। সফটইলোতে প্রতিটি অর্ডারের সাথে কাস্টমারের ফোন নম্বরের পূর্ববর্তী কুরিয়ার ডেলিভারি রেকর্ড লাইভ প্রদর্শিত হয়।
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <p className="text-sm text-slate-700 leading-normal">
                  <strong className="text-slate-900">হাই ডেলিভারি রেট বায়ার:</strong> ৮০% এর বেশি পার্সেল রিসিভ করা ভেরিফায়েড ক্রেতা।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  !
                </div>
                <p className="text-sm text-slate-700 leading-normal">
                  <strong className="text-slate-900">মিডিয়াম রিস্ক অ্যালার্ট:</strong> ৬০-৮০% সাকসেস রেট—পার্সেল পাঠানোর আগে ফোনে কনফার্মেশনের তাগিদ।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✕
                </div>
                <p className="text-sm text-slate-700 leading-normal">
                  <strong className="text-slate-900">হাই ফ্রড রিস্ক ব্লক:</strong> বারবার পার্সেল ক্যানসেল বা রিটার্ন করা ভুয়া কাস্টমার স্বয়ংক্রিয়ভাবে চিহ্নিত।
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/onboard"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all"
              >
                <span>ফ্রি সেলার একাউন্ট খুলুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Data Table Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    লাইভ কুরিয়ার ফ্রড স্কোরিং ইন্টেলিজেন্স
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 font-mono">
                  Real-time Courier API
                </span>
              </div>

              {/* Table / List */}
              <div className="divide-y divide-slate-100">
                {sampleChecks.map((row, idx) => (
                  <div key={idx} className="p-5 hover:bg-slate-50/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{row.name}</span>
                        <span className="text-xs text-slate-400 font-mono">{row.phone}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {row.location} • অর্ডার মূল্য: <span className="font-semibold text-slate-700">{row.orderValue}</span>
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-600">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {row.deliveries}
                        </span>
                        <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                          <XCircle className="w-3 h-3 text-rose-500" />
                          {row.returns}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          ({row.courierText})
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${row.badgeClass}`}>
                        {row.status === 'SAFE' && <ShieldCheck className="w-3.5 h-3.5" />}
                        {row.status === 'WARNING' && <AlertTriangle className="w-3.5 h-3.5" />}
                        {row.status === 'DANGER' && <ShieldAlert className="w-3.5 h-3.5" />}
                        {row.score}
                      </span>
                      <p className="text-[11px] font-medium text-slate-600 mt-1.5">
                        {row.actionText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Footer Note */}
              <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>🛡️ Steadfast & Pathao পার্সেল হিস্ট্রি ইন্টিগ্রেটেড</span>
                <span className="font-semibold text-emerald-700">ফ্রি মার্চেন্ট ফিচার</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

