'use client';

import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { createProduct, updateProduct, CreateProductPayload } from '@/services/products/product.service';
import { Product } from '@/types/api';
import { formatTaka } from '@/lib/validators';

interface ProductFormModalProps {
  isOpen: boolean;
  initialData?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

// Sample presets for quick demo testing
const SAMPLE_PRESETS = [
  { label: 'কটন পাঞ্জাবি', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80' },
  { label: 'স্মার্ট ওয়াচ', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
  { label: 'ওয়্যারলেস হেডফোন', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
  { label: 'লেদার ওয়ালেট', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80' },
];

export function ProductFormModal({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}: ProductFormModalProps) {
  const isEdit = Boolean(initialData?.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('20');
  const [images, setImages] = useState<string[]>([SAMPLE_PRESETS[0].url]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPrice(String(initialData.price ?? ''));
      setDiscountPrice(initialData.discountPrice ? String(initialData.discountPrice) : '');
      setStock(String(initialData.stock ?? '10'));
      setImages(initialData.images && initialData.images.length > 0 ? initialData.images : [SAMPLE_PRESETS[0].url]);
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
      setDiscountPrice('');
      setStock('20');
      setImages([SAMPLE_PRESETS[0].url]);
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Live discount calculation
  const numPrice = parseFloat(price) || 0;
  const numDiscountPrice = parseFloat(discountPrice) || 0;
  const hasDiscount = numDiscountPrice > 0 && numPrice > 0;
  const isInvalidDiscount = hasDiscount && numDiscountPrice >= numPrice;
  const discountSavings = hasDiscount && !isInvalidDiscount ? numPrice - numDiscountPrice : 0;
  const discountPercent = hasDiscount && !isInvalidDiscount ? Math.round((discountSavings / numPrice) * 100) : 0;

  const handleAddImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    if (images.includes(url)) {
      setError('এই ছবির লিংক ইতিমধ্যে যুক্ত রয়েছে');
      return;
    }
    setImages((prev) => [...prev, url]);
    setNewImageUrl('');
    setError('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length <= 1) {
      setError('কমপক্ষে একটি পণ্যের ছবি থাকা আবশ্যক');
      return;
    }
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      setError('পণ্যের নাম এবং সঠিক মূল্য দেওয়া বাধ্যতামূলক');
      return;
    }

    if (numPrice <= 0) {
      setError('পণ্যের মূল্য ০ টাকার চেয়ে বেশি হতে হবে');
      return;
    }

    if (isInvalidDiscount) {
      setError('অফার মূল্য অবশ্যই নিয়মিত মূল্যের চেয়ে কম হতে হবে');
      return;
    }

    const validImages = images.filter((img) => img.trim().length > 0);
    if (validImages.length === 0) {
      setError('কমপক্ষে একটি ছবির লিংক দিন');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload: CreateProductPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      price: numPrice,
      discountPrice: numDiscountPrice > 0 ? numDiscountPrice : undefined,
      stock: Math.max(0, parseInt(stock, 10) || 0),
      images: validImages,
    };

    try {
      if (isEdit && initialData?.id) {
        const res = await updateProduct(initialData.id, payload);
        if (res && res.success === false) {
          setError(res.message || 'পণ্য আপডেট করতে সমস্যা হয়েছে');
          return;
        }
      } else {
        const res = await createProduct(payload);
        if (res && res.success === false) {
          setError(res.message || 'পণ্য তৈরিতে সমস্যা হয়েছে');
          return;
        }
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'অপারেশন সম্পন্ন করা সম্ভব হয়নি');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {isEdit ? 'পণ্য সম্পাদনা করুন' : 'নতুন পণ্য যোগ করুন'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? 'পণ্যের তথ্য ও স্টক আপডেট করুন'
                : 'আপনার স্টোরে নতুন পণ্য তালিকাভুক্ত করতে নিচের ফর্মটি পূরণ করুন'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>পণ্যের নাম *</span>
              <span className="text-[10px] text-slate-400 font-normal">যেমন: কটন পাঞ্জাবি</span>
            </label>
            <input
              type="text"
              required
              placeholder="পণ্যের সঠিক ও আকর্ষণীয় নাম লিখুন"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">নিয়মিত মূল্য (৳) *</label>
              <input
                type="number"
                required
                min="1"
                placeholder="1200"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">অফার মূল্য (৳)</label>
                {discountPercent > 0 && !isInvalidDiscount && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {discountPercent}% ছাড়!
                  </span>
                )}
              </div>
              <input
                type="number"
                min="0"
                placeholder="যেমন: 990"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none transition ${
                  isInvalidDiscount
                    ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
                    : 'border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
                }`}
              />
            </div>

            {/* Discount Preview Helper */}
            {hasDiscount && (
              <div className="col-span-1 sm:col-span-2 text-[11px] pt-1 border-t border-slate-200 flex items-center justify-between">
                {isInvalidDiscount ? (
                  <span className="text-rose-600 font-semibold">
                    সতর্কতা: অফার মূল্য নিয়মিত মূল্যের চেয়ে কম হতে হবে
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium">
                    গ্রাহক সঞ্চয় করবেন: {formatTaka(discountSavings)} ({discountPercent}% ডিসকাউন্ট)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Inventory Stock */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>মজুদ স্টক সংখ্যা *</span>
              <span className="text-[10px] text-slate-400 font-normal">বর্তমানে কত পিস স্টকে আছে</span>
            </label>
            <input
              type="number"
              min="0"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          {/* Images Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>পণ্যের ছবি (Image URLs) *</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {images.length} টি ছবি যুক্ত আছে
              </span>
            </label>

            {/* Image Preview Grid */}
            <div className="flex flex-wrap gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 min-h-[72px]">
              {images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative group w-14 h-14 rounded-lg overflow-hidden border border-slate-300 bg-white shrink-0 shadow-xs"
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = SAMPLE_PRESETS[0].url;
                    }}
                  />
                  {index === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[8px] font-bold text-white text-center py-0.5">
                      প্রধান ছবি
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0.5 right-0.5 p-1 bg-rose-600/90 text-white rounded opacity-0 group-hover:opacity-100 transition shadow hover:bg-rose-700"
                    title="ছবি বাদ দিন"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Image Input */}
            <div className="flex items-center gap-1.5">
              <div className="flex-1 flex items-center gap-1.5 border border-slate-300 rounded-xl px-2.5 py-1.5 bg-white">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="url"
                  placeholder="ছবির সরাসরি লিংক (https://...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full text-xs focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>যোগ</span>
              </button>
            </div>

            {/* Quick Demo Image Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" /> ডেমো ইমেজ:
              </span>
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!images.includes(preset.url)) {
                      setImages((prev) => [...prev, preset.url]);
                    }
                  }}
                  className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 rounded-lg transition"
                >
                  +{preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">পণ্যের বিবরণ (ঐচ্ছিক)</label>
            <textarea
              rows={3}
              placeholder="পণ্যের সাইজ, ফেব্রিক, ওয়ারেন্টি বা অন্যান্য প্রয়োজনীয় বিবরণ লিখুন..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={submitting || isInvalidDiscount}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>সংরক্ষণ হচ্ছে...</span>
                </>
              ) : isEdit ? (
                'আপডেট সংরক্ষণ করুন'
              ) : (
                'পণ্য যোগ করুন'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

