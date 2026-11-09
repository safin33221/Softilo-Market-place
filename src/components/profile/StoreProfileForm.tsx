'use client';

import React, { useState } from 'react';
import { Store, Globe, Phone, Image as ImageIcon, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { TenantProfileData, updateTenantProfile } from '@/services/tenant/tenant.service';

interface StoreProfileFormProps {
  tenant: TenantProfileData;
  onSuccess: (updated: TenantProfileData) => void;
}

const DEMO_LOGOS = [
  { label: 'ফ্যাশন', url: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=80' },
  { label: 'গ্যাজেট', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80' },
  { label: 'অর্গানিক', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80' },
];

const DEMO_BANNERS = [
  { label: 'মডার্ন ডার্ক', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop&q=80' },
  { label: 'ফ্যাশন স্টোর', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80' },
  { label: 'টেক লাইফস্টাইল', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&auto=format&fit=crop&q=80' },
];

export function StoreProfileForm({ tenant, onSuccess }: StoreProfileFormProps) {
  const [name, setName] = useState(tenant.name || '');
  const [customDomain, setCustomDomain] = useState(tenant.customDomain || '');
  const [logoUrl, setLogoUrl] = useState(tenant.logoUrl || '');
  const [bannerUrl, setBannerUrl] = useState(tenant.bannerUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('দোকানের নাম খালি রাখা যাবে না');
      return;
    }

    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await updateTenantProfile({
        name: name.trim(),
        customDomain: customDomain.trim() || undefined,
        logoUrl: logoUrl.trim() || undefined,
        bannerUrl: bannerUrl.trim() || undefined,
      });

      if (res.success && res.tenant) {
        setSuccessMsg(res.message || 'প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে');
        onSuccess(res.tenant);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setError(res.message || 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'অপ্রত্যাশিত সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            শপ প্রোফাইল ও সেটিংস সম্পাদনা
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            আপনার ব্র্যান্ডের তথ্য, কাস্টম ডোমেইন এবং লোগো-ব্যানার পরিবর্তন করুন
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            দোকান ও ডোমেইন পরিচিতি
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shop Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                <span>দোকানের নাম *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: ফ্যাশন হাউজ বিডি"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            {/* Subdomain (Read Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>ফ্রি সাবডোমেন ইউআরএল (অপরিবর্তনযোগ্য)</span>
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                <input
                  type="text"
                  disabled
                  value={tenant.slug}
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-transparent text-slate-600 cursor-not-allowed font-mono"
                />
                <span className="bg-slate-100 text-slate-500 px-3 py-2.5 text-xs font-mono border-l border-slate-200">
                  .{siteConfig.domain}
                </span>
              </div>
            </div>

            {/* Custom Domain */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কাস্টম ডোমেইন (ঐচ্ছিক)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">যেমন: shop.mybrand.com</span>
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="shop.yourdomain.com"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition font-mono"
              />
              <p className="text-[10px] text-slate-400">
                কাস্টম ডোমেইন ব্যবহারের জন্য আপনার DNS-এ CNAME রেকর্ডটি <code className="bg-slate-100 px-1 py-0.2 rounded text-slate-700 font-mono">cname.{siteConfig.domain}</code>-এ পয়েন্ট করুন।
              </p>
            </div>

            {/* Registered Phone (Read Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>রেজিস্টার্ড মোবাইল নম্বর</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ভেরিফাইড
                </span>
              </label>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                <span className="text-slate-400 text-xs font-mono mr-1.5">+88</span>
                <span className="text-xs sm:text-sm font-mono text-slate-700 font-semibold">
                  {tenant.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Branding & Visuals */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            ব্র্যান্ডিং ও মিডিয়া ভিজ্যুয়ালস
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Logo URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>দোকানের লোগো (Logo Image URL)</span>
                </span>
              </label>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                  <img
                    src={logoUrl || 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=80'}
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              {/* Demo presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" /> ডেমো:
                </span>
                {DEMO_LOGOS.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLogoUrl(d.url)}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg transition"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Banner URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কভার ব্যানার (Banner Image URL)</span>
                </span>
              </label>

              <div className="flex items-center gap-2">
                <div className="w-16 h-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                  <img
                    src={bannerUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop&q=80'}
                    alt="Banner Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>

              {/* Demo presets */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" /> ডেমো:
                </span>
                {DEMO_BANNERS.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBannerUrl(d.url)}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg transition"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs shadow-emerald-600/20 transition-all hover:shadow disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

