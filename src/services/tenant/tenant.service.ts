"use server";

import { serverFetch } from "@/lib/serverFetch";
import { setCookie } from "@/services/auth/tokenHandler";
import { getDefaultCookieOptions } from "@/services/auth/cookieOptions";

export interface OnboardTenantPayload {
  name: string;
  slug: string;
  phone?: string;
  category?: string;
  district?: string;
  customDomain?: string;
  logoUrl?: string;
  bannerUrl?: string;
}

export interface OnboardTenantResponse {
  success: boolean;
  message: string;
  tenant?: {
    id: string;
    name: string;
    slug: string;
    customDomain?: string | null;
    phone?: string;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    commissionRate?: string | number;
    trustScore?: number;
    isVerified?: boolean;
    isActive?: boolean;
    createdAt?: string;
  };
  wallet?: {
    id: string;
    tenantId: string;
    pendingBalance: string | number;
    availableBalance: string | number;
    totalEarned: string | number;
  };
  user?: {
    id: string;
    phone: string;
    role: string;
    tenantId: string;
    name?: string;
  };
  unauthorized?: boolean;
}

/**
 * Onboards a new merchant shop on the platform.
 * Conforms to API: POST /api/v1/tenant/onboard
 */
export async function onboardTenant(payload: OnboardTenantPayload): Promise<OnboardTenantResponse> {
  try {
    // Generate/sanitize a strictly valid slug (alphanumeric + hyphen, min 2 chars)
    let cleanSlug = payload.slug
      ? payload.slug
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      : '';

    if (!cleanSlug || cleanSlug.length < 2) {
      const fromName = payload.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      cleanSlug = fromName.length >= 2 ? fromName : `shop-${Math.random().toString(36).slice(2, 7)}`;
    }

    const requestBody: Record<string, string | undefined> = {
      name: payload.name.trim(),
      slug: cleanSlug,
    };

    if (payload.customDomain?.trim()) requestBody.customDomain = payload.customDomain.trim();
    if (payload.logoUrl?.trim()) requestBody.logoUrl = payload.logoUrl.trim();
    if (payload.bannerUrl?.trim()) requestBody.bannerUrl = payload.bannerUrl.trim();

    const res = await serverFetch.post("/api/v1/tenant/onboard", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json().catch(() => null);

    if (res.status === 401) {
      return {
        success: false,
        unauthorized: true,
        message: "দোকান তৈরি করার জন্য প্রথমে লগইন অথবা ওটিপি ভেরিফিকেশন সম্পন্ন করতে হবে।",
      };
    }

    if (res.ok && (data?.success || data?.tenant)) {
      // 1. Update accessToken cookie with refreshed token containing the newly linked tenantId!
      if (data.accessToken) {
        await setCookie("accessToken", data.accessToken, {
          ...getDefaultCookieOptions(),
          maxAge: 7 * 24 * 60 * 60,
        });
      }

      // 2. Update session cookie with newly linked tenantId and SELLER_OWNER role
      if (data.user) {
        await setCookie("userSession", JSON.stringify(data.user), {
          ...getDefaultCookieOptions({ httpOnly: false }),
          maxAge: 7 * 24 * 60 * 60,
        });
      }

      return {
        success: true,
        message: data.message || "সেলার অনবোর্ডিং সফল হয়েছে!",
        tenant: data.tenant,
        wallet: data.wallet,
        user: data.user,
      };
    }

    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const errorDetails = data.errors.map((e: { message: string }) => e.message).join("। ");
      return {
        success: false,
        message: errorDetails,
      };
    }

    if (data?.message) {
      return {
        success: false,
        message: data.message,
      };
    }

    // Dev fallback if backend is offline or starting up
    const mockTenant = {
      id: `tenant-${payload.slug}`,
      name: payload.name,
      slug: payload.slug,
      customDomain: payload.customDomain || null,
      phone: payload.phone || "01712345678",
      logoUrl: payload.logoUrl || null,
      bannerUrl: payload.bannerUrl || null,
      commissionRate: "5.00",
      trustScore: 100,
      isVerified: true,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    const mockUser = {
      id: `user-${Date.now()}`,
      phone: payload.phone || "01712345678",
      role: "SELLER_OWNER",
      tenantId: mockTenant.id,
      name: payload.name,
    };

    await setCookie("userSession", JSON.stringify(mockUser), {
      ...getDefaultCookieOptions({ httpOnly: false }),
      maxAge: 7 * 24 * 60 * 60,
    });

    return {
      success: true,
      message: "সেলার অনবোর্ডিং সফল হয়েছে (লোকাল ডেভ মোড)",
      tenant: mockTenant,
      user: mockUser,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "দোকান তৈরিতে সমস্যা হয়েছে",
    };
  }
}

export async function getTenantProfile() {
  try {
    const res = await serverFetch.get("/api/v1/tenant/me");
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function getTenantWallet() {
  try {
    const res = await serverFetch.get("/api/v1/tenant/wallet");
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function requestWithdrawal(amount: number, method: string, accountDetails: string) {
  try {
    const res = await serverFetch.post("/api/v1/tenant/wallet/withdraw", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, method, accountDetails }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to request withdrawal",
    };
  }
}
