'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Wallet,
  LogOut,
  Store,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { logout, getMe } from '@/services/auth';
import { User } from '@/types/api';

export function SellerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await getMe();
        if (u) setUser(u);
      } catch {
        // ignore
      }
    }
    loadUser();
  }, []);

  const links = [
    {
      label: 'ড্যাশবোর্ড',
      href: '/seller/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'প্রোডাক্টস',
      href: '/seller/products',
      icon: Package,
    },
    {
      label: 'অর্ডার ম্যানেজমেন্ট',
      href: '/seller/orders',
      icon: ShoppingBag,
    },
    {
      label: 'ওয়ালেট ও উইথড্র',
      href: '/seller/wallet',
      icon: Wallet,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
    router.push('/login');
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                Seller Center
              </span>
            </div>
          </Link>
        </div>

        {/* Store Profile Quick Card */}
        <div className="p-4 mx-3 my-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-950">ভেরিফাইড মার্চেন্ট শপ</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5 truncate">
            {user?.name || 'মার্চেন্ট শপ'}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
            ID: {user?.tenantId || user?.id?.slice(0, 8) || 'verified'}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Store className="w-4 h-4 text-slate-400" />
          <span>মার্কেটপ্লেস হোম</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>লগআউট করুন</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-sm">{siteConfig.name} সেলার</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-2xs"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {navContent}
      </aside>
    </>
  );
}
