'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Globe, MapPin, ArrowRight, ArrowLeft, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { BD_LOCATIONS } from '@/lib/bd-locations';
import { onboardTenant } from '@/services/tenant/tenant.service';
import { sendOtp, verifyOtp, getMe } from '@/services/auth';

const DEFAULT_DISTRICTS = [
  { district: 'Dhaka', districtBn: 'ঢাকা', thanas: ['Dhanmondi', 'Mirpur', 'Uttara', 'Gulshan', 'Mohammadpur', 'Motijheel'] },
  { district: 'Gazipur', districtBn: 'গাজীপুর', thanas: ['Gazipur Sadar', 'Tongi', 'Kaliakair'] },
  { district: 'Narayanganj', districtBn: 'নারায়ণগঞ্জ', thanas: ['Narayanganj Sadar', 'Siddhirganj'] },
  { district: 'Chattogram', districtBn: 'চট্টগ্রাম', thanas: ['Panchlaish', 'Kotwali', 'Halishahar'] },
  { district: 'Sylhet', districtBn: 'সিলেট', thanas: ['Sylhet Sadar', 'Amberkhana'] },
  { district: 'Rajshahi', districtBn: 'রাজশাহী', thanas: ['Boalia', 'Rajpara'] },
  { district: 'Khulna', districtBn: 'খুলনা', thanas: ['Khulna Sadar', 'Sonadanga'] },
  { district: 'Barishal', districtBn: 'বরিশাল', thanas: ['Kotwali', 'Airport'] },
  { district: 'Rangpur', districtBn: 'রংপুর', thanas: ['Rangpur Sadar'] },
  { district: 'Mymensingh', districtBn: 'ময়মনসিংহ', thanas: ['Mymensingh Sadar'] },
  { district: 'Cumilla', districtBn: 'কুমিল্লা', thanas: ['Cumilla Adarsha Sadar'] },
  { district: 'Bogura', districtBn: 'বগুড়া', thanas: ['Bogura Sadar'] },
];

export function OnboardingForm() {
  const router = useRouter();
  const districtList = (Array.isArray(BD_LOCATIONS) && BD_LOCATIONS.length > 0)
    ? BD_LOCATIONS
    : DEFAULT_DISTRICTS;

  const [step, setStep] = useState<'FORM' | 'OTP'>('FORM');
  const [shopName, setShopName] = useState('');
  const [slug, setSlug] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('Dhanmondi');
  const [category, setCategory] = useState('Fashion & Clothing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentDistrictObj = districtList.find((d) => d.district === district) || districtList[0];
  const thanas = currentDistrictObj?.thanas || ['Sadar'];

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    const targetObj = districtList.find((d) => d.district === newDistrict);
    if (targetObj && targetObj.thanas && targetObj.thanas.length > 0) {
      setThana(targetObj.thanas[0]);
    }
  };

  const sanitizeSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (val: string) => {
    setShopName(val);
    const cleaned = sanitizeSlug(val);
    if (cleaned.length >= 2) {
      setSlug(cleaned);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) {
      setError('আপনার দোকানের নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন');
      return;
    }

    // Ensure valid slug before proceeding
    let effectiveSlug = sanitizeSlug(slug);
    if (!effectiveSlug || effectiveSlug.length < 2) {
      const fromName = sanitizeSlug(shopName);
      effectiveSlug = fromName.length >= 2 ? fromName : `shop-${phone.replace(/[^0-9]/g, '').slice(-4) || Math.random().toString(36).slice(2, 6)}`;
      setSlug(effectiveSlug);
    }

    setLoading(true);
    setError('');

    try {
      // Check if user already authenticated
      const user = await getMe();
      if (user?.id) {
        // User already logged in, create store directly
        const res = await onboardTenant({
          name: shopName.trim(),
          slug: effectiveSlug,
          phone,
          category,
          district,
        });

        if (res.success) {
          router.push('/seller/dashboard');
          return;
        } else {
          setError(res.message);
        }
      } else {
        // User not logged in: send OTP first
        const otpRes = await sendOtp(phone);
        if (otpRes.success) {
          if (otpRes.devOtp) {
            setDevOtpHint(otpRes.devOtp);
            setOtp(otpRes.devOtp);
          }
          setStep('OTP');
        } else {
          setError(otpRes.message);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'দোকান তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('সঠিক ৪-ডিজিট ওটিপি কোড প্রদান করুন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Verify OTP and authenticate as SELLER_OWNER
      const authRes = await verifyOtp({
        phone,
        otp,
        name: shopName,
        role: 'SELLER_OWNER',
      });

      if (!authRes.success) {
        setError(authRes.message || 'ভুল ওটিপি কোড');
        setLoading(false);
        return;
      }

      // 2. Prepare valid slug
      let effectiveSlug = sanitizeSlug(slug);
      if (!effectiveSlug || effectiveSlug.length < 2) {
        const fromName = sanitizeSlug(shopName);
        effectiveSlug = fromName.length >= 2 ? fromName : `shop-${phone.replace(/[^0-9]/g, '').slice(-4) || Math.random().toString(36).slice(2, 6)}`;
      }

      // 3. Onboard tenant on backend
      const onboardRes = await onboardTenant({
        name: shopName.trim(),
        slug: effectiveSlug,
        phone,
        category,
        district,
      });

      if (onboardRes.success) {
        router.push('/seller/dashboard');
      } else {
        setError(onboardRes.message || 'দোকান তৈরি সম্পন্ন করা যায়নি।');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'ওটিপি যাচাইয়ে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      {error && (
        <div className="p-3 text-xs sm:text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
          {error}
        </div>
      )}

      {step === 'FORM' ? (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Shop Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>দোকানের নাম (Shop Name) *</span>
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: ফ্যাশন হাউজ বিডি"
              value={shopName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          {/* Slug / Subdomain */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>আপনার ফ্রি সাবডোমেন ইউআরএল</span>
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <input
                type="text"
                required
                placeholder="fashion-house"
                value={slug}
                onChange={(e) => setSlug(sanitizeSlug(e.target.value))}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
              />
              <span className="bg-slate-100 text-slate-600 px-3 py-2.5 text-xs font-mono border-l border-slate-200">
                .{siteConfig.domain}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">মার্কেটপ্লেসে আপনার নিজস্ব ব্র্যান্ডেড স্টোর লিংক</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900">
              মোবাইল নম্বর (লগইন ও নোটিফিকেশন) *
            </label>
            <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <span className="bg-slate-100 text-slate-600 px-3 py-2.5 text-xs font-semibold border-r border-slate-200">
                +88
              </span>
              <input
                type="tel"
                required
                maxLength={11}
                placeholder="017XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900">ক্যাটাগরি</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            >
              <option value="Fashion & Clothing">ফ্যাশন ও পোশাক</option>
              <option value="Electronics & Gadgets">ইলেকট্রনিক্স ও গ্যাজেট</option>
              <option value="Beauty & Cosmetics">বিউটি ও প্রসাধন</option>
              <option value="Organic & Food">অর্গানিক খাবার ও গ্রোসারি</option>
              <option value="Home & Lifestyle">হোম ও লাইফস্টাইল</option>
            </select>
          </div>

          {/* District & Thana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>জেলা</span>
              </label>
              <select
                value={district}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                {districtList.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district} ({d.districtBn})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-900">থানা / উপজেলা</label>
              <select
                value={thana}
                onChange={(e) => setThana(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                {thanas.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md shadow-emerald-600/20 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>দোকান তৈরি সম্পন্ন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% ফ্রি সেটআপ • কোনো হিডেন চার্জ নেই</span>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtpAndCreate} className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">মোবাইল ভেরিফিকেশন</h3>
              <p className="text-xs text-slate-500">দোকানের মালিকানা নিশ্চিতে ওটিপি দিন</p>
            </div>
            <button
              type="button"
              onClick={() => setStep('FORM')}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ফিরে যান</span>
            </button>
          </div>

          {devOtpHint && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ডেভ মোড ওটিপি কোড: <strong>{devOtpHint}</strong></span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-emerald-600" />
              <span>৪-ডিজিট ওটিপি কোড</span>
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="1234"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center tracking-widest text-xl font-bold font-mono"
            />
            <p className="text-[11px] text-slate-500 text-center">
              +88{phone} নম্বরে পাঠানো ওটিপি কোড লিখুন
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>ওটিপি যাচাই করে দোকান তৈরি করুন</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
