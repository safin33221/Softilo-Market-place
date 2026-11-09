'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, X, Store } from 'lucide-react';
import { getTenantProfile, TenantProfileData } from '@/services/tenant/tenant.service';
import { StoreHeroHeader } from '@/components/profile/StoreHeroHeader';
import { StoreMetricsSummary } from '@/components/profile/StoreMetricsSummary';
import { StoreProfileForm } from '@/components/profile/StoreProfileForm';
import { StoreSecurityCard } from '@/components/profile/StoreSecurityCard';

export default function SellerProfilePage() {
  const [tenant, setTenant] = useState<TenantProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const loadProfile = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const res = await getTenantProfile();
      if (res.success && res.tenant) {
        setTenant(res.tenant);
      } else {
        showToast('error', res.message || 'শপ প্রোফাইল লোড করতে ব্যর্থ হয়েছে');
      }
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'ত্রুটি ঘটেছে');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleProfileUpdate = (updated: TenantProfileData) => {
    setTenant((prev) => (prev ? { ...prev, ...updated } : updated));
    showToast('success', 'শপ প্রোফাইল সফলভাবে আপডেট করা হয়েছে');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Toast Banner */}
      {toast && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded hover:bg-black/5 text-slate-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              শপ প্রোফাইল ও সেটিংস
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              মার্চেন্ট একাউন্ট
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            আপনার অনলাইন ব্র্যান্ড, লোগো, কভার ব্যানার ও নিরাপত্তা সেটিংস পরিচালনা করুন
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadProfile(true)}
          disabled={loading || refreshing}
          className="h-9 px-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs disabled:opacity-50 self-start sm:self-auto cursor-pointer"
          title="রিফ্রেশ করুন"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-600' : ''}`} />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">প্রোফাইল তথ্য লোড হচ্ছে...</p>
        </div>
      ) : !tenant ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-md mx-auto shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mx-auto">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            শপ প্রোফাইল পাওয়া যায়নি
          </h3>
          <p className="text-xs text-slate-500">
            আপনার অ্যাকাউন্টে কোনো সক্রিয় শপ পাওয়া যায়নি। অনুগ্রহ করে দোকান অনবোর্ডিং সম্পন্ন করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Hero Header */}
          <StoreHeroHeader tenant={tenant} />

          {/* Metrics Summary */}
          <StoreMetricsSummary tenant={tenant} />

          {/* Settings Form */}
          <StoreProfileForm tenant={tenant} onSuccess={handleProfileUpdate} />

          {/* Security & Credentials */}
          <StoreSecurityCard tenant={tenant} />
        </div>
      )}
    </div>
  );
}

