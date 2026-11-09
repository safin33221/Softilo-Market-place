'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { Product } from '@/types/api';
import { AddProductModal } from '@/components/products/AddProductModal';
import { ProductListTable } from '@/components/products/ProductListTable';
import { getProducts, deleteProduct } from '@/services/products/product.service';

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const res = await getProducts({ limit: 100 });
      setProducts(res.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">পণ্য তালিকা</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            আপনার স্টোরের সকল পণ্য এবং ইনভেন্টরি স্টক পরিচালনা করুন
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন পণ্য যোগ করুন</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 max-w-md bg-white border border-slate-200 rounded-xl px-3 py-2">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="পণ্যের নাম দিয়ে খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs focus:outline-none"
        />
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <ProductListTable products={filteredProducts} onDelete={handleDelete} />
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProducts}
      />
    </div>
  );
}
