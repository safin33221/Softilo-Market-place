import React from 'react';
import { redirect } from 'next/navigation';
import { getMe } from '@/services/auth/getMe';
import { PhoneOtpForm } from '@/components/auth/PhoneOtpForm';
import { siteConfig } from '@/config/site';
import { Store } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // If already logged in, redirect away from login page
  const user = await getMe();
  if (user?.id) {
    if (user.tenantId) {
      redirect('/seller/dashboard');
    } else {
      redirect('/onboard');
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-200">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            সেলার ড্যাশবোর্ড লগইন
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {siteConfig.name} মার্চেন্ট পোর্টালে আপনার মোবাইল নম্বর দিয়ে প্রবেশ করুন।
          </p>
        </div>

        {/* OTP Form */}
        <PhoneOtpForm />

        {/* Create new shop CTA */}
        <div className="text-center text-sm text-slate-600">
          <span>নতুন সেলার? </span>
          <Link href="/onboard" className="font-bold text-emerald-600 hover:text-emerald-700">
            বিনামূল্যে দোকান খুলুন
          </Link>
        </div>
      </div>
    </div>
  );
}

