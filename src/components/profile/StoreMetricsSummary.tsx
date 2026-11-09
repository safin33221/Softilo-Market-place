'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Package, ShoppingBag, Wallet, ArrowUpRight, TrendingUp } from 'lucide-react';
import { TenantProfileData } from '@/services/tenant/tenant.service';
import { formatTaka } from '@/lib/validators';

interface StoreMetricsSummaryProps {
  tenant: TenantProfileData;
}

export function StoreMetricsSummary({ tenant }: StoreMetricsSummaryProps) {
  const trustScore = tenant.trustScore ?? 100;
  const productCount = tenant._count?.products ?? 0;
  const orderCount = tenant._count?.orders ?? 0;
  const availableBal = Number(tenant.wallet?.availableBalance) || 0;
  const pendingBal = Number(tenant.wallet?.pendingBalance) || 0;

  const cards = [
    {
      title: 'মার্চেন্ট ট্রাস্ট স্কোর',
      value: `${trustScore}%`,
      subtext: 'হাই-ট্রাস্ট রেটিং বজায় রয়েছে',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      href: null,
    },
    {
      title: 'মোট পণ্য সংখ্যা',
      value: `${productCount} টি`,
      subtext: 'স্টোরে সক্রিয় ক্যাটালগ',
      icon: Package,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      href: '/seller/products',
    },
    {
      title: 'মোট অর্ডার সংখ্যা',
      value: `${orderCount} টি`,
      subtext: 'মোট সফল ও প্রক্রিয়াধীন অর্ডার',
      icon: ShoppingBag,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      href: '/seller/orders',
    },
    {
      title: 'উত্তোলনযোগ্য ওয়ালেট ব্যালেন্স',
      value: formatTaka(availableBal),
      subtext: `পেন্ডিং ব্যালেন্স: ${formatTaka(pendingBal)}`,
      icon: Wallet,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      href: '/seller/wallet',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map((c, i) => {
        const Icon = c.icon;
        const content = (
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all group relative overflow-hidden h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-500 line-clamp-1">
                  {c.title}
                </span>
                <div className={`p-1.5 rounded-lg border shrink-0 ${c.badgeColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {c.value}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate">{c.subtext}</span>
              {c.href && (
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition shrink-0" />
              )}
            </div>
          </div>
        );

        return c.href ? (
          <Link key={i} href={c.href}>
            {content}
          </Link>
        ) : (
          <div key={i}>{content}</div>
        );
      })}
    </div>
  );
}

