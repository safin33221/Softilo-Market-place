'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: `${siteConfig.name}-এ দোকান খুলতে কি কোনো টাকা লাগে?`,
      a: 'না, একদম বিনামূল্যে। কোনো রেজিস্ট্রেশন ফি, মাসিক চার্জ বা হিডেন সাবস্ক্রিপশন নেই। আপনি যত দিন ইচ্ছা বিনামূল্যে দোকান চালাতে পারবেন।',
    },
    {
      q: 'কমিশন কীভাবে কাটা হয়?',
      a: `শুধুমাত্র যখন কোনো পণ্য কাস্টমারের হাতে সফলভাবে ডেলিভারি হয় এবং কুরিয়ার ক্যাশ কালেকশন করে, তখন চূড়ান্ত বিক্রয় মূল্যের ওপর মাত্র ${siteConfig.commissionRate}% কমিশন কেটে বাকি ৯৫% সরাসরি আপনার ওয়ালেটে জমা হয়। কোনো রিটার্ন অর্ডারে কমিশন কাটা হয় না।`,
    },
    {
      q: 'ডেলিভারি এবং পার্সেল বুকিং কীভাবে কাজ করে?',
      a: 'আমাদের প্ল্যাটফর্মে Steadfast ও Pathao কুরিয়ার সম্পূর্ণ ইন্টিগ্রেটেড। নতুন অর্ডার আসলে আপনার ড্যাশবোর্ড থেকে ১-ক্লিকেই পার্সেল কনসাইনমেন্ট ক্রিয়েট হয়ে যাবে এবং রাইডার এসে আপনার ঠিকানা থেকে পার্সেল পিকআপ করবে।',
    },
    {
      q: 'ওয়ালেট থেকে টাকা কীভাবে তুলব?',
      a: 'কাস্টমার পার্সেল রিসিভ করার সাথে সাথে আপনার ওয়ালেটে এভেইলেবল ব্যালেন্স যুক্ত হয়। আপনি যেকোনো সময় বিকাশ, নগদ কিংবা আপনার ব্যাংক অ্যাকাউন্টে উইথড্র রিকোয়েস্ট পাঠাতে পারেন।',
    },
    {
      q: 'কুরিয়ার ফ্রড চেকার কীভাবে সাহায্য করে?',
      a: 'কাস্টমার অর্ডার দেওয়ার সাথে সাথেই তার ফোন নম্বর অ্যানালাইজ করে তার পূর্ববর্তী সফল ডেলিভারি রেশিও বের করা হয়। যদি কারও ডেলিভারি রেট খুব কম থাকে, সিস্টেম আপনাকে সতর্ক করবে যেন আপনি পার্সেল পাঠানোর আগে তার সাথে যোগাযোগ করেন বা অগ্রিম কুরিয়ার চার্জ নেন।',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সচরাচর জিজ্ঞাসিত প্রশ্নাবলী</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            মার্চেন্টদের সাধারণ জিজ্ঞাসা
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-emerald-700 transition"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

