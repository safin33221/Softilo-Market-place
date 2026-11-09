'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PlusCircle, RefreshCw, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { Product } from '@/types/api';
import { getProducts, deleteProduct } from '@/services/products/product.service';
import { ProductStatsCards } from '@/components/products/ProductStatsCards';
import {
  ProductFilterBar,
  StockFilterType,
  SortOptionType,
} from '@/components/products/ProductFilterBar';
import { ProductListTable } from '@/components/products/ProductListTable';
import { ProductGridCards } from '@/components/products/ProductGridCards';
import { ProductFormModal } from '@/components/products/ProductFormModal';
import { DeleteProductDialog } from '@/components/products/DeleteProductDialog';

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & View state
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilterType>('all');
  const [sortBy, setSortBy] = useState<SortOptionType>('newest');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / Banner state
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const loadProducts = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const res = await getProducts({ limit: 150 });
      setProducts(res.items || []);
    } catch (err) {
      console.error(err);
      showToast('error', 'পণ্য তালিকা লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Counts for filters
  const counts = useMemo(() => {
    return {
      all: products.length,
      inStock: products.filter((p) => p.stock > 5).length,
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    };
  }, [products]);

  // Filtered and sorted products
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search query
    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.id?.toLowerCase().includes(query)
      );
    }

    // 2. Stock filter
    if (stockFilter === 'in_stock') {
      result = result.filter((p) => p.stock > 5);
    } else if (stockFilter === 'low_stock') {
      result = result.filter((p) => p.stock > 0 && p.stock <= 5);
    } else if (stockFilter === 'out_of_stock') {
      result = result.filter((p) => p.stock === 0);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'price_asc') {
        const priceA = Number(a.discountPrice || a.price) || 0;
        const priceB = Number(b.discountPrice || b.price) || 0;
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        const priceA = Number(a.discountPrice || a.price) || 0;
        const priceB = Number(b.discountPrice || b.price) || 0;
        return priceB - priceA;
      }
      if (sortBy === 'stock_asc') {
        return (a.stock || 0) - (b.stock || 0);
      }
      if (sortBy === 'title_asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      // default: newest
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return result;
  }, [products, search, stockFilter, sortBy]);

  // Modal actions
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      const res = await deleteProduct(deletingProduct.id);
      if (res.success) {
        showToast('success', res.message || 'পণ্য সফলভাবে মুছে ফেলা হয়েছে');
        setDeletingProduct(null);
        await loadProducts(true);
      } else {
        showToast('error', res.message || 'পণ্য মুছতে সমস্যা হয়েছে');
      }
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'ত্রুটি ঘটেছে');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSuccess = () => {
    showToast(
      'success',
      editingProduct ? 'পণ্যের তথ্য সফলভাবে আপডেট হয়েছে' : 'নতুন পণ্য সফলভাবে যুক্ত হয়েছে'
    );
    loadProducts(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Toast Banner */}
      {toast && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded hover:bg-black/5 text-slate-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              পণ্য ব্যবস্থাপনা (Product Inventory)
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {products.length} টি পণ্য
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            আপনার অনলাইন শপের সমস্ত পণ্য তালিকা, মূল্য, অফার ও স্টক রিয়েল-টাইমে পরিচালনা করুন
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => loadProducts(true)}
            disabled={isLoading || isRefreshing}
            className="h-9 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs disabled:opacity-50"
            title="রিফ্রেশ করুন"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
            <span className="hidden sm:inline">রিফ্রেশ</span>
          </button>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all hover:shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <ProductStatsCards
        products={products}
        currentFilter={stockFilter}
        onFilterSelect={(filter) => setStockFilter(filter)}
      />

      {/* Filter and Search Bar */}
      <ProductFilterBar
        search={search}
        onSearchChange={setSearch}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500">পণ্য তালিকা লোড হচ্ছে...</p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <Sparkles className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {search || stockFilter !== 'all' ? 'কোনো পণ্য খুঁজে পাওয়া যায়নি' : 'এখনও কোনো পণ্য নেই'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {search || stockFilter !== 'all'
                ? 'আপনার সার্চ বা ফিল্টার শর্ত অনুযায়ী কোনো পণ্য মিলছে না।'
                : 'আপনার অনলাইন স্টোরে প্রথম পণ্যটি যুক্ত করে বিক্রি শুরু করুন।'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            {search || stockFilter !== 'all' ? (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setStockFilter('all');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                ফিল্টার রিসেট করুন
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                প্রথম পণ্য যোগ করুন
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'table' ? (
        <ProductListTable
          products={displayedProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      ) : (
        <ProductGridCards
          products={displayedProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Form Modal (Add & Edit) */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        initialData={editingProduct}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
