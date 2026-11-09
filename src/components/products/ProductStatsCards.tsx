'use client';

import React from 'react';
import { Package, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { Product } from '@/types/api';

interface ProductStatsCardsProps {
  products: Product[];
  currentFilter: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  onFilterSelect: (filter: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock') => void;
}

export function ProductStatsCards({
  products,
  currentFilter,
  onFilterSelect,
}: ProductStatsCardsProps) {
  const total = products.length;
  const inStock = products.filter((p) => p.stock > 5).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const totalInventoryValue = products.reduce((acc, p) => {
    const unitPrice = Number(p.discountPrice || p.price) || 0;
    const qty = Number(p.stock) || 0;
    return acc + unitPrice * qty;
  }, 0);

  const stats = [
    {
      id: 'all' as const,
      label: 'মোট পণ্য সংখ্যা',
      value: total,
      subtext: `${inStock} টি পণ্য বিক্রির জন্য প্রস্তুত`,
      icon: Package,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      activeRing: currentFilter === 'all' ? 'ring-2 ring-blue-500/80 bg-blue-50/20' : '',
    },
    {
      id: 'in_stock' as const,
      label: 'ইন স্টক',
      value: inStock,
      subtext: 'পর্যাপ্ত মজুদ রয়েছে',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      activeRing: currentFilter === 'in_stock' ? 'ring-2 ring-emerald-500/80 bg-emerald-50/20' : '',
    },
    {
      id: 'low_stock' as const,
      label: 'স্বল্প স্টক (১-৫ টি)',
      value: lowStock,
      subtext: 'দ্রুত রিস্টক করা প্রয়োজন',
      icon: AlertTriangle,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      activeRing: currentFilter === 'low_stock' ? 'ring-2 ring-amber-500/80 bg-amber-50/20' : '',
    },
    {
      id: 'out_of_stock' as const,
      label: 'স্টক শেষ',
      value: outOfStock,
      subtext: 'বিক্রি বন্ধ রয়েছে',
      icon: XCircle,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      activeRing: currentFilter === 'out_of_stock' ? 'ring-2 ring-rose-500/80 bg-rose-50/20' : '',
    },
    {
      id: null,
      label: 'ইনভেন্টরি সম্ভাব্য মূল্য',
      value: formatTaka(totalInventoryValue),
      subtext: 'বর্তমান স্টক বাজারমূল্য',
      icon: TrendingUp,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      activeRing: '',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        const isClickable = stat.id !== null;

        return (
          <div
            key={idx}
            onClick={() => isClickable && stat.id && onFilterSelect(stat.id)}
            className={`p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs transition-all relative overflow-hidden ${
              isClickable ? 'cursor-pointer hover:border-slate-300 hover:shadow-sm' : ''
            } ${stat.activeRing}`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-500 line-clamp-1">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-lg border shrink-0 ${stat.badgeColor}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
              {stat.id !== null && typeof stat.value === 'number' && (
                <span className="text-[11px] text-slate-400 font-medium">টি</span>
              )}
            </div>

            <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}

