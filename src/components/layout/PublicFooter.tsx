import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Store, ShieldCheck, Phone, Mail } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              বাংলাদেশের বিশ্বস্ত ও নির্ভরযোগ্য মার্চেন্ট সেলস প্ল্যাটফর্ম। জিরো সাবস্ক্রিপশন ফি ও স্মার্ট ডেলিভারি ম্যানেজমেন্ট।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% নিরাপদ ও ভেরিফায়েড মার্চেন্ট নেটওয়ার্ক</span>
            </div>
          </div>

          {/* Seller Solutions */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              মার্চেন্ট সলিউশন
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/onboard" className="hover:text-emerald-400 transition">
                  নতুন শপ খুলুন
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition">
                  সেলার ড্যাশবোর্ড লগইন
                </Link>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition">
                  কমিশন ও রেট ক্যালকুলেটর
                </a>
              </li>
              <li>
                <a href="#fraud-protection" className="hover:text-emerald-400 transition">
                  কুরিয়ার ফ্রড চেকার
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              ইন্টিগ্রেশন ও সুবিধা
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400">Steadfast কুরিয়ার এপিআই</li>
              <li className="text-slate-400">Pathao পার্সেল ডেলিভারি</li>
              <li className="text-slate-400">বিকাশ ও নগদ মার্চেন্ট সেটেলমেন্ট</li>
              <li className="text-slate-400">কাস্টমার রিটার্ন রেশিও প্রোটেকশন</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              মার্চেন্ট হেল্পলাইন
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{siteConfig.helpline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>seller-support@{siteConfig.domain}</span>
              </div>
              <p className="text-xs text-slate-500 pt-2">
                সকাল ৯টা থেকে রাত ১০টা পর্যন্ত আমাদের ডেডিকেটেড মার্চেন্ট সাপোর্ট টিম লাইভ থাকে।
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name} Limited. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

