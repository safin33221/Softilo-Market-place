import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatTaka } from '@/lib/validators';

interface TransactionItem {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  date: string;
  status: 'SETTLED' | 'PENDING';
}

const mockTransactions: TransactionItem[] = [
  {
    id: 'TXN-9021',
    type: 'CREDIT',
    amount: 1425,
    description: 'অর্ডার #ORD-5829 ডেলিভারি ক্যাশ (৳১,৫০০ - ৫% কমিশন ৳৭৫)',
    date: 'আজ, ০৩:৪৫ PM',
    status: 'SETTLED',
  },
  {
    id: 'TXN-9018',
    type: 'DEBIT',
    amount: 5000,
    description: 'বিকাশ পার্সোনাল উইথড্র (01712-XXXXXX)',
    date: 'গতকাল, ১১:২০ AM',
    status: 'SETTLED',
  },
  {
    id: 'TXN-9011',
    type: 'CREDIT',
    amount: 2090,
    description: 'অর্ডার #ORD-5812 ডেলিভারি ক্যাশ (৳২,২০০ - ৫% কমিশন ৳১১০)',
    date: '০৭ নভেম্বর, ০৫:১০ PM',
    status: 'SETTLED',
  },
];

export function LedgerTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-200">
        <h2 className="text-base font-bold text-slate-900">লেনদেনের বিবরণী (Wallet Ledger)</h2>
        <p className="text-xs text-slate-500">
          প্রতিটি অর্ডারের ৫% কমিশন কর্তন ও উইথড্রয়াল হিস্ট্রি
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">ট্রানজেকশন আইডি</th>
              <th className="p-4">বিবরণ</th>
              <th className="p-4">তারিখ ও সময়</th>
              <th className="p-4">পরিমাণ</th>
              <th className="p-4 text-right">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-mono font-bold text-slate-900 flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'CREDIT'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {tx.type === 'CREDIT' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <span>{tx.id}</span>
                </td>
                <td className="p-4 text-slate-700 font-medium">{tx.description}</td>
                <td className="p-4 text-slate-500">{tx.date}</td>
                <td className="p-4 font-black">
                  <span
                    className={
                      tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-rose-600'
                    }
                  >
                    {tx.type === 'CREDIT' ? '+' : '-'} {formatTaka(tx.amount)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

