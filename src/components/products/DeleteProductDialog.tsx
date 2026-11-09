'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Product } from '@/types/api';

interface DeleteProductDialogProps {
  isOpen: boolean;
  product?: Product | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteProductDialog({
  isOpen,
  product,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteProductDialogProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900">
            পণ্যটি মুছে ফেলতে চান?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            আপনি কি নিশ্চিতভাবে <span className="font-semibold text-slate-800">“{product.title}”</span> পণ্যটি আপনার ইনভেন্টরি থেকে স্থায়ীভাবে মুছে ফেলতে চান? এটি আর পুনরায় ফিরিয়ে আনা সম্ভব হবে না।
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
          >
            বাতিল
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition disabled:opacity-50 flex items-center gap-1.5"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>ডিলিট হচ্ছে...</span>
              </>
            ) : (
              'হ্যাঁ, মুছে ফেলুন'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

