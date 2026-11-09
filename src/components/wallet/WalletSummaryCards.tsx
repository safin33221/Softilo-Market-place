import React from 'react';
import { Wallet, Clock, TrendingUp } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { TenantWallet } from '@/types/api';

interface WalletSummaryCardsProps {
  wallet: TenantWallet | null;
  onOpenWithdraw: () => void;
}

export function WalletSummaryCards({ wallet, onOpenWithdraw }: WalletSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Available Balance */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-100">
            উত্তোলনযোগ্য ব্যালেন্স (Available)
          </span>
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="text-3xl font-black">
          {formatTaka(wallet?.availableBalance || 0)}
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenWithdraw}
            className="w-full py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold transition shadow-sm"
          >
            টাকা তুলুন (Withdraw)
          </button>
        </div>
      </div>

      {/* Pending Balance */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            পেন্ডিং কুরিয়ার ক্যাশ (In Transit)
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-black text-amber-600">
          {formatTaka(wallet?.pendingBalance || 0)}
        </div>
        <p className="text-[11px] text-slate-400">
          কুরিয়ার ডেলিভারি সম্পন্ন করে ক্যাশ সেটেলমেন্ট করার সাথে সাথেই ব্যালেন্সে যুক্ত হবে
        </p>
      </div>

      {/* Total Earned */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            সর্বমোট আয় (Total Earned)
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-black text-purple-700">
          {formatTaka(wallet?.totalEarned || 0)}
        </div>
        <p className="text-[11px] text-slate-400">
          ৫% কমিশন বাদে আপনার নেট অর্জিত আয়
        </p>
      </div>
    </div>
  );
}

