import React from 'react';
import { DollarSign, ShieldAlert, Truck, WalletCards, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function FeatureGrid() {
  const features = [
    {
      icon: DollarSign,
      title: 'জিরো সাবস্ক্রিপশন ফি',
      description: 'দোকান খুলতে বা চালাতে কোনো প্রকার মাসিক কিংবা বাৎসরিক চার্জ নেই। আপনি শুধু বিক্রয় হলেই মাত্র ৫% কমিশন দেবেন।',
      tag: '০ টাকা ফিক্সড ফি',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: ShieldAlert,
      title: 'কুরিয়ার ফ্রড চেকার',
      description: 'Steadfast ও Pathao ডাটাবেজ থেকে কাস্টমারের ডেলিভারি সাকসেস রেট লাইভ চেক হয়। ফলে ফেক অর্ডার ও রিটার্ন পার্সেল লস থেকে সুরক্ষিত থাকবেন।',
      tag: 'স্মার্ট সেফটি',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: Truck,
      title: '১-ক্লিকে কুরিয়ার বুকিং',
      description: 'অর্ডার আসার সাথে সাথে ম্যানুয়ালি টাইপ না করেই ১-ক্লিকে Steadfast বা Pathao কুরিয়ারে কনসাইনমেন্ট ক্রিয়েট ও ট্র্যাকিং কোড জেনারেট করুন।',
      tag: 'অটোমেশন',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: WalletCards,
      title: 'ইনস্ট্যান্ট ওয়ালেট পেআউট',
      description: 'কুরিয়ার থেকে ক্যাশ অন ডেলিভারি (COD) রিসিভ হওয়ার পর সরাসরি আপনার ওয়ালেটে ব্যালেন্স জমা হয়। বিকাশ, নগদ বা ব্যাংক একাউন্টে ক্যাশআউট করুন।',
      tag: 'দ্রুত পেমেন্ট',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            কেন বাংলাদেশি সেলাররা {siteConfig.name} বেছে নিচ্ছেন?
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base">
            ফেসবুক পেজ বা সাধারণ ওয়েবসাইটের চেয়ে অনেক বেশি নিরাপদ, স্বয়ংক্রিয় এবং লাভজনক।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-600 flex items-center justify-center transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500 group-hover:text-emerald-600">
                  <span>মার্চেন্ট ফিচার</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

