'use client';

import React from 'react';
import { ShoppingBag, Truck } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { FraudScoreBadge } from '@/components/seller/FraudScoreBadge';
import { Order } from '@/types/api';

interface OrderListTableProps {
  orders: Order[];
  onOpenModal: (order: Order) => void;
}

export function OrderListTable({ orders, onOpenModal }: OrderListTableProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
        <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
        <p className="text-base font-bold text-slate-700">কোনো অর্ডার পাওয়া যায়নি</p>
        <p className="text-xs text-slate-500 mt-1">
          কাস্টমাররা আপনার দোকানে অর্ডার করলে এখানে তালিকা দেখতে পাবেন।
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">অর্ডার আইডি</th>
              <th className="p-4">কাস্টমার ও ঠিকানা</th>
              <th className="p-4">কুরিয়ার ফ্রড স্কোর</th>
              <th className="p-4">পণ্য ও পরিমাণ</th>
              <th className="p-4">সর্বমোট মূল্য</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4 text-right">কুরিয়ার ও অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-mono font-bold text-slate-900">
                  #{order.id.slice(0, 8)}
                  <p className="text-[10px] text-slate-400 font-normal">
                    {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                  </p>
                </td>

                <td className="p-4">
                  <p className="font-bold text-slate-900">{order.customerName}</p>
                  <p className="text-slate-600 font-mono text-[11px] font-semibold">
                    {order.customerPhone}
                  </p>
                  <p className="text-slate-400 text-[10px] truncate max-w-[200px]">
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
                  <p className="font-semibold text-slate-800">
                    {order.items?.[0]?.productName || 'অর্ডার পণ্য'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {order.items?.length || 1} টি আইটেম
                  </p>
                </td>

                <td className="p-4">
                  <p className="font-black text-slate-900 text-sm">
                    {formatTaka(order.totalAmount)}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    COD
                  </span>
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
                  <button
                    type="button"
                    onClick={() => onOpenModal(order)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-bold rounded-lg text-xs transition"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>কুরিয়ার বুকিং</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

