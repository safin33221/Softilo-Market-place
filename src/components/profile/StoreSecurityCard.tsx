'use client';

import React from 'react';
import { ShieldCheck, Lock, KeyRound, Server, HelpCircle, CheckCircle2 } from 'lucide-react';
import { TenantProfileData } from '@/services/tenant/tenant.service';

interface StoreSecurityCardProps {
  tenant: TenantProfileData;
}

export function StoreSecurityCard({ tenant }: StoreSecurityCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>অ্যাকাউন্ট সিকিউরিটি ও আইসোলেশন</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            আপনার স্টোরের ডেটা আইসোলেশন ও এনক্রিপশন স্ট্যাটাস
          </p>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>সুরক্ষিত ও সক্রিয়</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Security Item 1 */}
        <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
            <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
            <span>লগইন এক্সেস রোল</span>
          </div>
          <p className="text-sm font-black text-slate-900">SELLER_OWNER</p>
          <p className="text-[10px] text-slate-500">
            স্টোর ও ওয়ালেট পরিচালনার পূর্ণ এডমিন অধিকার প্রাপ্ত
          </p>
        </div>

        {/* Security Item 2 */}
        <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
            <Server className="w-3.5 h-3.5 text-emerald-600" />
            <span>টেন্যান্ট আইসোলেশন</span>
          </div>
          <p className="text-sm font-black text-slate-900">PostgreSQL Strict</p>
          <p className="text-[10px] text-slate-500">
            আপনার পণ্য ও অর্ডার অন্য কোনো স্টোর এক্সেস করতে পারে না
          </p>
        </div>

        {/* Security Item 3 */}
        <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>অ্যান্টি-ফ্রড প্রোটেকশন</span>
          </div>
          <p className="text-sm font-black text-slate-900">AI কুরিয়ার ফ্রড চেকার</p>
          <p className="text-[10px] text-slate-500">
            ফেইক কাস্টমার ও রিটার্ন পার্সেল ঝুঁকি পূর্বাভাস প্রযুক্তি
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p>
          আপনার মোবাইল নম্বরে পাঠানো ওটিপি কোড কখনো কারো সাথে শেয়ার করবেন না। ওয়ালেট উইথড্রয়াল ও স্টোর সেটিংস পরিবর্তনের সময় নিরাপত্তার স্বার্থে এসএমএস ভেরিফিকেশন প্রয়োজন হতে পারে।
        </p>
      </div>
    </div>
  );
}

