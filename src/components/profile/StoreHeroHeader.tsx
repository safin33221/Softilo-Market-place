'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, ExternalLink, Copy, Check, Sparkles, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { TenantProfileData } from '@/services/tenant/tenant.service';
import { formatDate } from '@/lib/utils';

interface StoreHeroHeaderProps {
  tenant: TenantProfileData;
}

export function StoreHeroHeader({ tenant }: StoreHeroHeaderProps) {
  const [copied, setCopied] = useState(false);

  const storeUrl = tenant.customDomain
    ? `https://${tenant.customDomain}`
    : `https://${tenant.slug}.${siteConfig.domain}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultBanner =
    tenant.bannerUrl ||
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop&q=80';

  const defaultLogo =
    tenant.logoUrl ||
    'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=80';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Banner Image */}
      <div className="relative h-44 sm:h-56 w-full bg-slate-900 overflow-hidden">
        <img
          src={defaultBanner}
          alt={tenant.name}
          className="w-full h-full object-cover opacity-85"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {/* Verification Pill */}
        <div className="absolute top-4 right-4">
          {tenant.isVerified ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>ভেরিফাইড মার্চেন্ট শপ</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-sm">
              <Clock className="w-4 h-4" />
              <span>ভেরিফিকেশন পেন্ডিং</span>
            </span>
          )}
        </div>
      </div>

      {/* Profile Overview Body */}
      <div className="p-4 sm:p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
          {/* Logo & Store Names */}
          <div className="flex items-end gap-3.5">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white p-1 border-2 border-white shadow-lg overflow-hidden shrink-0">
              <img
                src={defaultLogo}
                alt={tenant.name}
                className="w-full h-full object-cover rounded-xl bg-slate-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            <div className="space-y-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {tenant.name}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  মার্চেন্ট
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>{tenant.slug}.{siteConfig.domain}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: Store Link & Copy */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-9 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">লিংক কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>লিংক কপি করুন</span>
                </>
              )}
            </button>

            <Link
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs shadow-emerald-600/20 transition-all hover:shadow"
            >
              <span>স্টোর দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sub-meta details bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              দোকান আইডি: <strong className="font-mono text-slate-800">#{tenant.id.slice(0, 8)}</strong>
            </span>
            <span>•</span>
            <span>
              রেজিস্ট্রেশন তারিখ: <strong className="text-slate-800">{formatDate(tenant.createdAt)}</strong>
            </span>
            <span>•</span>
            <span>
              কমিশন হার: <strong className="text-emerald-700">{tenant.commissionRate}% প্ল্যাটফর্ম ফি</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>জিরো সাবস্ক্রিপশন ফি অ্যাকাউন্ট</span>
          </div>
        </div>
      </div>
    </div>
  );
}

