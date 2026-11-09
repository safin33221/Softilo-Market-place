'use client';

import React, { useState } from 'react';
import { X, Truck } from 'lucide-react';
import { Order, OrderStatus, CourierProvider } from '@/types/api';
import { updateOrderStatus } from '@/services/order/order.service';

interface CourierBookingModalProps {
  order: Order | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function CourierBookingModal({ order, onClose, onSuccess }: CourierBookingModalProps) {
  const [status, setStatus] = useState<OrderStatus>(order?.status || 'IN_COURIER');
  const [courier, setCourier] = useState<CourierProvider>(order?.courierProvider || 'STEADFAST');
  const [trackingCode, setTrackingCode] = useState(
    order?.trackingCode || `SF-${Math.floor(1000000 + Math.random() * 9000000)}`
  );
  const [submitting, setSubmitting] = useState(false);

  if (!order) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateOrderStatus(order.id, status);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              অর্ডার আপডেট ও কুরিয়ার বুকিং
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              অর্ডার #{order.id.slice(0, 8)} • {order.customerName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Order Status Select */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">অর্ডার স্ট্যাটাস</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="PENDING">PENDING (নতুন অর্ডার)</option>
              <option value="CONFIRMED">CONFIRMED (কনফার্ম করা হয়েছে)</option>
              <option value="IN_COURIER">IN_COURIER (কুরিয়ারে পাঠানো হয়েছে)</option>
              <option value="DELIVERED">DELIVERED (সফলভাবে ডেলিভারি সম্পন্ন)</option>
              <option value="CANCELLED">CANCELLED (বাতিল)</option>
              <option value="RETURNED">RETURNED (রিটার্ন)</option>
            </select>
          </div>

          {/* Courier Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ইন্টিগ্রেটেড কুরিয়ার সার্ভিস</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setCourier('STEADFAST');
                  setTrackingCode(`SF-${Math.floor(1000000 + Math.random() * 9000000)}`);
                }}
                className={`p-3 rounded-xl border text-center font-bold transition ${
                  courier === 'STEADFAST'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Steadfast কুরিয়ার
              </button>
              <button
                type="button"
                onClick={() => {
                  setCourier('PATHAO');
                  setTrackingCode(`PT-${Math.floor(1000000 + Math.random() * 9000000)}`);
                }}
                className={`p-3 rounded-xl border text-center font-bold transition ${
                  courier === 'PATHAO'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Pathao পার্সেল
              </button>
            </div>
          </div>

          {/* Tracking ID */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">কুরিয়ার ট্র্যাকিং কোড</label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition disabled:opacity-50"
            >
              {submitting ? 'আপডেট হচ্ছে...' : 'সেভ ও কনফার্ম'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
