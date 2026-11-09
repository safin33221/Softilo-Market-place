import React from 'react';
import Link from 'next/link';
import { Wallet, Clock, TrendingUp } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { TenantWallet } from '@/types/api';

interface DashboardMetricCardsProps {
  wallet: TenantWallet | null;
  productCount: number;
}

export function DashboardMetricCards({ wallet, productCount }: DashboardMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Available Balance */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-md space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-100">
            উত্তোলনযোগ্য ব্যালেন্স (Available)
          </span>
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black">
          {formatTaka(wallet?.availableBalance || 0)}
        </div>
        <div className="pt-2 flex items-center justify-between text-xs">
          <span className="text-emerald-100">ডেলিভারি সম্পন্ন নিট আয়</span>
          <Link
            href="/seller/wallet"
            className="font-bold underline text-white hover:text-emerald-200"
          >
            উইথড্র করুন →
          </Link>
        </div>
      </div>

      {/* Pending Balance */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            পেন্ডিং ব্যালেন্স (In Transit)
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-amber-600">
          {formatTaka(wallet?.pendingBalance || 0)}
        </div>
        <p className="text-[11px] text-slate-400">
          কুরিয়ারে ডেলিভারি হওয়ার সাথে সাথেই এই টাকা আপনার Available ব্যালেন্সে জমা হবে
        </p>
      </div>

      {/* Total Earned & Orders */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            সর্বমোট প্ল্যাটফর্ম আয় (Total Earned)
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-purple-700">
          {formatTaka(wallet?.totalEarned || 0)}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
          <span>মোট পণ্য: <strong className="text-slate-800">{productCount} টি</strong></span>
          <span>•</span>
          <span>কমিশন রেট: <strong className="text-emerald-600">৫%</strong></span>
        </div>
      </div>
    </div>
  );
}

