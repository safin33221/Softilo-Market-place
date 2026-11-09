'use client';

import React from 'react';
import { Trash2, Package, Pencil, AlertTriangle } from 'lucide-react';
import { formatTaka } from '@/lib/validators';
import { formatDate } from '@/lib/utils';
import { Product } from '@/types/api';

interface ProductListTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductListTable({ products, onEdit, onDelete }: ProductListTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
        <Package className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
        <p className="text-base font-bold text-slate-700">কোনো পণ্য পাওয়া যায়নি</p>
        <p className="text-xs text-slate-500 mt-1">
          সার্চ কীওয়ার্ড পরিবর্তন করুন অথবা নতুন পণ্য যোগ করুন।
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/90 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-4">পণ্য বিবরণ</th>
              <th className="py-3.5 px-4">নিয়মিত মূল্য</th>
              <th className="py-3.5 px-4">অফার মূল্য</th>
              <th className="py-3.5 px-4">মজুদ স্টক</th>
              <th className="py-3.5 px-4">স্ট্যাটাস</th>
              <th className="py-3.5 px-4">তারিখ</th>
              <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => {
              const numPrice = Number(item.price) || 0;
              const numDiscountPrice = item.discountPrice ? Number(item.discountPrice) : 0;
              const hasDiscount = numDiscountPrice > 0 && numDiscountPrice < numPrice;
              const discountPercent = hasDiscount
                ? Math.round(((numPrice - numDiscountPrice) / numPrice) * 100)
                : 0;

              const isOutOfStock = item.stock <= 0;
              const isLowStock = item.stock > 0 && item.stock <= 5;

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Product Details & Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Package className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm max-w-xs truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: #{item.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Regular Price */}
                  <td className="py-3 px-4 font-bold text-slate-800">
                    <span className={hasDiscount ? 'text-slate-400 line-through text-xs font-normal' : ''}>
                      {formatTaka(numPrice)}
                    </span>
                  </td>

                  {/* Discount Price */}
                  <td className="py-3 px-4">
                    {hasDiscount ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-emerald-600">
                          {formatTaka(numDiscountPrice)}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {discountPercent}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  {/* Stock Quantity */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-semibold text-slate-700">
                      {item.stock} পিস
                    </span>
                  </td>

                  {/* Stock Status Badge */}
                  <td className="py-3 px-4">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        স্টক শেষ
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        স্বল্প স্টক
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ইন স্টক
                      </span>
                    )}
                  </td>

                  {/* Created Date */}
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {item.createdAt ? formatDate(item.createdAt) : '-'}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                        title="পণ্য সম্পাদনা করুন"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="পণ্য মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
