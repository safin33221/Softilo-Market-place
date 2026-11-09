'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, KeyRound, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { normalizeBdPhone } from '@/lib/validators';

import { sendOtp, verifyOtp } from '@/services/auth';

export function PhoneOtpForm() {
  const router = useRouter();
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = normalizeBdPhone(phone);
    if (cleanPhone.length !== 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await sendOtp(cleanPhone);
      if (res.success) {
        if (res.devOtp) {
          setDevOtpHint(res.devOtp);
          setOtp(res.devOtp);
        }
        setStep('OTP');
      } else {
        setError(res.message);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ওটিপি পাঠাতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('সঠিক ৪-ডিজিটের ওটিপি দিন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await verifyOtp({
        phone,
        otp,
        role: 'SELLER_OWNER',
      });

      if (res.success && res.user) {

        router.push('/seller/dashboard');
      } else {
        setError(res.message || 'ভুল ওটিপি কোড');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ওটিপি যাচাইয়ে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {error && (
        <div className="p-3 text-xs sm:text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
          {error}
        </div>
      )}

      {step === 'PHONE' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>মোবাইল নম্বর</span>
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <span className="bg-slate-100 text-slate-600 px-3 py-2.5 text-xs font-semibold border-r border-slate-200">
                +88
              </span>
              <input
                type="tel"
                required
                maxLength={11}
                placeholder="017XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              আপনার একাউন্টের সাথে যুক্ত ১১-ডিজিটের মোবাইল নম্বর (বাংলা বা ইংরেজি)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>ওটিপি কোড পাঠান</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          {devOtpHint && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ডেভ মোড ওটিপি কোড: <strong>{devOtpHint}</strong></span>
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-emerald-600" />
                <span>ওটিপি (OTP) কোড</span>
              </label>
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>নম্বর পরিবর্তন</span>
              </button>
            </div>

            <input
              type="text"
              required
              maxLength={6}
              placeholder="1234"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center tracking-widest text-xl font-bold font-mono"
            />
            <p className="text-[11px] text-slate-500 text-center">
              +88{normalizeBdPhone(phone)} নম্বরে পাঠানো ৪-ডিজিট কোড লিখুন
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>লগইন নিশ্চিত করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>১০০% নিরাপদ ও এন্ড-টু-এন্ড এনক্রিপ্টেড ওটিপি</span>
      </div>
    </div>
  );
}
