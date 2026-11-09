import React from 'react';
import { redirect } from 'next/navigation';
import { getMe } from '@/services/auth/getMe';
import { OnboardingForm } from '@/components/onboard/OnboardingForm';
import { siteConfig } from '@/config/site';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function OnboardPage() {
  // If user is already authenticated AND already has an active shop, redirect to dashboard
  const user = await getMe();
  if (user?.id && user?.tenantId) {
    redirect('/seller/dashboard');
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>মাত্র ২ মিনিটে ফ্রি শপ অনবোর্ডিং</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {siteConfig.name}-এ আপনার দোকান খুলুন
          </h1>
          <p className="text-sm text-slate-600">
            তথ্যগুলো পূরণ করে বিনামূল্যে আপনার অনলাইন শপ তৈরি করুন এবং বিক্রি শুরু করুন।
          </p>
        </div>

        {/* Form Component */}
        <OnboardingForm />

        {/* Existing seller link */}
        <div className="text-center text-sm text-slate-600">
          <span>ইতিমধ্যে দোকান আছে? </span>
          <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
            সেলার ড্যাশবোর্ডে লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
