'use client';

import React from 'react';
import { Search, X, LayoutGrid, LayoutList, ArrowUpDown, Filter } from 'lucide-react';

export type StockFilterType = 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
export type SortOptionType =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'stock_asc'
  | 'title_asc';

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  stockFilter: StockFilterType;
  onStockFilterChange: (filter: StockFilterType) => void;
  sortBy: SortOptionType;
  onSortByChange: (sort: SortOptionType) => void;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  counts: {
    all: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

export function ProductFilterBar({
  search,
  onSearchChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  counts,
}: ProductFilterBarProps) {
  const tabs: { id: StockFilterType; label: string; count: number }[] = [
    { id: 'all', label: 'সব পণ্য', count: counts.all },
    { id: 'in_stock', label: 'ইন স্টক', count: counts.inStock },
    { id: 'low_stock', label: 'সীমিত স্টক', count: counts.lowStock },
    { id: 'out_of_stock', label: 'স্টক শেষ', count: counts.outOfStock },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-3">
      {/* Top row: Search input + Sort + View mode switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="পণ্যের নাম বা বিবরণ দিয়ে সার্চ করুন..."
            className="w-full pl-10 pr-9 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & View options */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50/80 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortOptionType)}
              className="bg-transparent border-none text-xs font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest">সর্বশেষ যোগকৃত</option>
              <option value="price_asc">মূল্য: কম থেকে বেশি</option>
              <option value="price_desc">মূল্য: বেশি থেকে কম</option>
              <option value="stock_asc">স্টক: কম থেকে বেশি</option>
              <option value="title_asc">নাম: A - Z</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              title="টেবিল ভিউ"
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              title="গ্রিড ভিউ"
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Filter tabs with counts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none border-t border-slate-100 text-xs">
        <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3" />
          ফিল্টার:
        </span>
        {tabs.map((tab) => {
          const isActive = stockFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStockFilterChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all text-xs ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

