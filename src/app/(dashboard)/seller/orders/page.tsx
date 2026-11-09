'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Order } from '@/types/api';
import { CourierBookingModal } from '@/components/orders/CourierBookingModal';
import { OrderListTable } from '@/components/orders/OrderListTable';
import { getOrders } from '@/services/order/order.service';

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getOrders({ limit: 100 });
      setOrders(res.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.includes(search) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          অর্ডার ও কুরিয়ার ম্যানেজমেন্ট
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          সকল কাস্টমার অর্ডার প্রসেস করুন, কুরিয়ার ফ্রড চেক এবং ১-ক্লিকে পার্সেল বুক করুন
        </p>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {[
            { label: 'সব অর্ডার', value: 'ALL' },
            { label: 'নতুন (Pending)', value: 'PENDING' },
            { label: 'কুরিয়ারে (In Courier)', value: 'IN_COURIER' },
            { label: 'ডেলিভার্ড (Delivered)', value: 'DELIVERED' },
            { label: 'বাতিল (Cancelled)', value: 'CANCELLED' },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === tab.value
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 max-w-xs bg-white border border-slate-200 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="কাস্টমার বা ফোন দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <OrderListTable
          orders={filteredOrders}
          onOpenModal={(ord) => setSelectedOrder(ord)}
        />
      )}

      {/* Courier Modal */}
      <CourierBookingModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onSuccess={loadOrders}
      />
    </div>
  );
}
