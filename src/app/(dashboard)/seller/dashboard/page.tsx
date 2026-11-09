'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, ShieldCheck } from 'lucide-react';
import { TenantWallet, Order } from '@/types/api';
import { siteConfig } from '@/config/site';
import { DashboardMetricCards } from '@/components/dashboard/DashboardMetricCards';
import { DashboardRecentOrders } from '@/components/dashboard/DashboardRecentOrders';
import { getTenantWallet } from '@/services/tenant/tenant.service';
import { getOrders } from '@/services/order/order.service';
import { getProducts } from '@/services/products/product.service';

export default function SellerDashboardPage() {
  const [wallet, setWallet] = useState<TenantWallet | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      try {
        const [w, ords, prods] = await Promise.all([
          getTenantWallet(),
          getOrders({ limit: 5 }),
          getProducts({ limit: 100 }),
        ]);

        if (w && !w.message) {
          setWallet(w);
        }
        if (ords?.items) {
          setRecentOrders(ords.items);
        }
        if (prods?.items) {
          setProductCount(prods.items.length);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ভেরিফায়েড মার্চেন্ট অ্যাকাউন্ট</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            মার্চেন্ট সেলস ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {siteConfig.name} মার্চেন্ট পোর্টাল থেকে আপনার সেলস, ইনভেন্টরি ও কুরিয়ার নিয়ন্ত্রণ করুন
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/seller/products"
            className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন পণ্য আপলোড</span>
          </Link>
        </div>
      </div>

      {/* 3 Major Wallet Metric Cards */}
      <DashboardMetricCards wallet={wallet} productCount={productCount} />

      {/* Recent Orders with Courier Fraud Badge */}
      <DashboardRecentOrders orders={recentOrders} />
    </div>
  );
}
