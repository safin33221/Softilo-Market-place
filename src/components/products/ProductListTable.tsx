'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2, Package } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { Product } from '@/types/api';

interface ProductListTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductListTable({ products, onDelete }: ProductListTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
        <Package className="w-12 h-12 mx-auto mb-3 opacity-40 text-slate-400" />
        <p className="text-base font-bold text-slate-700">কোনো পণ্য পাওয়া যায়নি</p>
        <p className="text-xs text-slate-500 mt-1">
          ডানদিকের বাটনে ক্লিক করে আপনার প্রথম পণ্যটি আপলোড করুন।
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
              <th className="p-4">পণ্য</th>
              <th className="p-4">মূল্য</th>
              <th className="p-4">অফার মূল্য</th>
              <th className="p-4">স্টক</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Package className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm max-w-xs truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ID: {item.id.slice(0, 8)}
                    </p>
                  </div>
                </td>

                <td className="p-4 font-bold text-slate-900">
                  {formatTaka(item.price)}
                </td>

                <td className="p-4 font-bold text-emerald-600">
                  {item.discountPrice ? formatTaka(item.discountPrice) : '-'}
                </td>

                <td className="p-4">
                  <span className="font-mono font-semibold text-slate-700">
                    {item.stock} টি
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.stock > 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {item.stock > 0 ? 'ইন স্টক' : 'স্টক শেষ'}
                  </span>
                </td>

                <td className="p-4 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="পণ্য মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
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

