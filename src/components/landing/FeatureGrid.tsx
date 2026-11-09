import React from 'react';
import { DollarSign, ShieldAlert, Truck, WalletCards, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function FeatureGrid() {
  const features = [
    {
      icon: DollarSign,
      title: 'জিরো সাবস্ক্রিপশন ফি',
      description: 'দোকান খুলতে বা চালাতে কোনো প্রকার মাসিক কিংবা বাৎসরিক চার্জ নেই। আপনি শুধু বিক্রয় হলেই মাত্র ৫% কমিশন দেবেন।',
      tag: '০ টাকা ফিক্সড ফি',
      iconBg: 'bg-emerald-50 text-emerald-600 ring-emerald-500/10',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    },
    {
      icon: ShieldAlert,
      title: 'কুরিয়ার ফ্রড চেকার',
      description: 'Steadfast ও Pathao ডাটাবেজ থেকে কাস্টমারের ডেলিভারি সাকসেস রেট লাইভ চেক হয়। ফলে ফেক অর্ডার ও রিটার্ন পার্সেল লস থেকে সুরক্ষিত থাকবেন।',
      tag: 'স্মার্ট সেফটি',
      iconBg: 'bg-amber-50 text-amber-600 ring-amber-500/10',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200/70',
    },
    {
      icon: Truck,
      title: '১-ক্লিকে কুরিয়ার বুকিং',
      description: 'অর্ডার আসার সাথে সাথে ম্যানুয়ালি টাইপ না করেই ১-ক্লিকে Steadfast বা Pathao কুরিয়ারে কনসাইনমেন্ট ক্রিয়েট ও ট্র্যাকিং কোড জেনারেট করুন।',
      tag: 'অটোমেশন',
      iconBg: 'bg-teal-50 text-teal-600 ring-teal-500/10',
      tagColor: 'bg-teal-50 text-teal-700 border-teal-200/70',
    },
    {
      icon: WalletCards,
      title: 'ইনস্ট্যান্ট ওয়ালেট পেআউট',
      description: 'কুরিয়ার থেকে ক্যাশ অন ডেলিভারি (COD) রিসিভ হওয়ার পর সরাসরি আপনার ওয়ালেটে ব্যালেন্স জমা হয়। বিকাশ, নগদ বা ব্যাংক একাউন্টে ক্যাশআউট করুন।',
      tag: 'দ্রুত পেমেন্ট',
      iconBg: 'bg-purple-50 text-purple-600 ring-purple-500/10',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200/70',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>সেলার সেন্ট্রিক সুবিধা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            কেন বাংলাদেশি সেলাররা {siteConfig.name} বেছে নিচ্ছেন?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed font-normal">
            ফেসবুক পেজ বা সাধারণ ওয়েবসাইটের চেয়ে অনেক বেশি নিরাপদ, স্বয়ংক্রিয় এবং লাভজনক মার্চেন্ট ফ্রেমওয়ার্ক।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${item.iconBg} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-emerald-700 transition-colors">
                  <span>মার্চেন্ট ফিচার</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

