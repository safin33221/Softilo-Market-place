'use client';

import React, { useState, useEffect } from 'react';
import { TenantWallet } from '@/types/api';
import { WalletSummaryCards } from '@/components/wallet/WalletSummaryCards';
import { WithdrawModal } from '@/components/wallet/WithdrawModal';
import { LedgerTable } from '@/components/wallet/LedgerTable';
import { getTenantWallet } from '@/services/tenant/tenant.service';

export default function SellerWalletPage() {
  const [wallet, setWallet] = useState<TenantWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadWallet = async () => {
    setIsLoading(true);
    try {
      const data = await getTenantWallet();
      if (data && !data.message) {
        setWallet(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleWithdrawSuccess = (amount: number, method: string) => {
    setSuccessMsg(
      `আপনার ৳${amount.toLocaleString('en-IN')} এর ${method} উইথড্র রিকোয়েস্ট সফলভাবে গ্রহণ করা হয়েছে। ২৪ ঘণ্টার মধ্যে আপনার অ্যাকাউন্টে টাকা পৌঁছে যাবে।`
    );
    loadWallet();
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          মার্চেন্ট ওয়ালেট ও উইথড্র
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          ডেলিভারি ক্যাশ সেটেলমেন্ট, কমিশন হিসাব এবং সরাসরি বিকাশ বা ব্যাংকে টাকা তোলার ড্যাশবোর্ড
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
          {successMsg}
        </div>
      )}

      {/* Wallet Cards */}
      {isLoading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <WalletSummaryCards
          wallet={wallet}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
        />
      )}

      {/* Ledger Table */}
      <LedgerTable />

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawOpen}
        wallet={wallet}
        onClose={() => setIsWithdrawOpen(false)}
        onSuccess={handleWithdrawSuccess}
      />
    </div>
  );
}
