'use client';

import React from 'react';
import { Package, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { Product } from '@/types/api';
import { formatTaka } from '@/lib/validators';

interface ProductGridCardsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductGridCards({
  products,
  onEdit,
  onDelete,
}: ProductGridCardsProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col overflow-hidden"
          >
            {/* Image Container with Badges */}
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              {item.images?.[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Package className="w-10 h-10" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5">
                {isOutOfStock ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600/90 text-white backdrop-blur-xs">
                    স্টক শেষ
                  </span>
                ) : isLowStock ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-xs flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    স্বল্প স্টক ({item.stock})
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs">
                    স্টকে আছে ({item.stock})
                  </span>
                )}
              </div>

              {/* Discount Tag */}
              {hasDiscount && (
                <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-emerald-700 transition">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-1">
                  ID: #{item.id.slice(0, 8)}
                </p>
              </div>

              {/* Pricing & Stock Summary */}
              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  {hasDiscount ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">
                        {formatTaka(numDiscountPrice)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatTaka(numPrice)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base font-black text-slate-900">
                      {formatTaka(numPrice)}
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-semibold text-slate-500">
                  {item.stock} পিস
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>সম্পাদনা</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

