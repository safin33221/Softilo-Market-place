'use client';

import React, { useState } from 'react';
import { X, Send, ShieldCheck } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { TenantWallet } from '@/types/api';
import { requestWithdrawal } from '@/services/tenant/tenant.service';

interface WithdrawModalProps {
  isOpen: boolean;
  wallet: TenantWallet | null;
  onClose: () => void;
  onSuccess: (amount: number, method: string) => void;
}

export function WithdrawModal({ isOpen, wallet, onClose, onSuccess }: WithdrawModalProps) {
  const [method, setMethod] = useState<'BKASH' | 'NAGAD' | 'BANK'>('BKASH');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const available = parseFloat(String(wallet?.availableBalance)) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount) || 0;

    if (withdrawAmount <= 0 || withdrawAmount > available) {
      setError('সঠিক পরিমাণ লিখুন যা আপনার Available Balance এর সমান বা কম।');
      return;
    }
    if (!accountNumber.trim()) {
      setError('সঠিক একাউন্ট নাম্বার দিন।');
      return;
    }

    setLoading(true);
    try {
      await requestWithdrawal(withdrawAmount, method, accountNumber.trim());
      onSuccess(withdrawAmount, method);
      onClose();
    } catch {
      setError('উইথড্র রিকোয়েস্টে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">টাকা তুলুন (Withdrawal Request)</h2>
            <p className="text-xs text-slate-400">
              সর্বোচ্চ উত্তোলনযোগ্য: {formatTaka(available)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Method tabs */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">পেমেন্ট মেথড নির্বাচন করুন</label>
            <div className="grid grid-cols-3 gap-2">
              {(['BKASH', 'NAGAD', 'BANK'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2 px-3 rounded-xl border font-bold text-center transition ${
                    method === m
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m === 'BKASH' ? 'বিকাশ' : m === 'NAGAD' ? 'নগদ' : 'ব্যাংক'}
                </button>
              ))}
            </div>
          </div>

          {/* Account Number */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">
              {method === 'BANK' ? 'ব্যাংক একাউন্ট নম্বর ও শাখার নাম' : `${method} পার্সোনাল নম্বর`}
            </label>
            <input
              type="text"
              required
              placeholder={method === 'BANK' ? 'A/C: 123456789, Islami Bank' : '017XXXXXXXX'}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">উত্তোলনের পরিমাণ (৳)</label>
            <input
              type="number"
              required
              min={100}
              max={available}
              placeholder="যেমন: 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition disabled:opacity-50"
            >
              {loading ? 'রিকোয়েস্ট হচ্ছে...' : 'রিকোয়েস্ট পাঠান'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

