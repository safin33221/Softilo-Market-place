import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { FraudScoreBadge } from '@/components/seller/FraudScoreBadge';
import { Order } from '@/types/api';

interface DashboardRecentOrdersProps {
  orders: Order[];
}

export function DashboardRecentOrders({ orders }: DashboardRecentOrdersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">সাম্প্রতিক অর্ডারসমূহ</h2>
          <p className="text-xs text-slate-500">
            সর্বশেষ আসা কাস্টমার অর্ডার এবং কুরিয়ার ফ্রড স্কোর
          </p>
        </div>
        <Link
          href="/seller/orders"
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          <span>সব অর্ডার দেখুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">অর্ডার আইডি</th>
              <th className="p-4">কাস্টমার ও ঠিকানা</th>
              <th className="p-4">কুরিয়ার ফ্রড স্কোর</th>
              <th className="p-4">পরিমাণ ও মূল্য</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  এখনো কোনো নতুন অর্ডার আসেনি
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-slate-900">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-slate-500 font-mono text-[11px]">{order.customerPhone}</p>
                    <p className="text-slate-400 text-[10px] truncate max-w-[180px]">
                      {order.district}, {order.thana}
                    </p>
                  </td>
                  <td className="p-4">
                    <FraudScoreBadge
                      totalDelivered={order.customerDeliveryStats?.totalDelivered}
                      totalReturned={order.customerDeliveryStats?.totalReturned}
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-black text-slate-900 text-sm">
                      {formatTaka(order.totalAmount)}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {order.items?.length || 1} টি আইটেম • COD
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'CANCELLED'
                          ? 'bg-rose-100 text-rose-800'
                          : order.status === 'IN_COURIER'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="/seller/orders"
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-lg text-xs transition"
                    >
                      ম্যানেজ
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
