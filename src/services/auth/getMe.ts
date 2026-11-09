"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookies } from "./tokenHandler";
import { User } from "@/types/api";

/**
 * Fetches current authenticated user profile.
 */
export async function getMe(): Promise<User | null> {
  const token = await getCookies("accessToken");
  if (!token) return null;

  // 1. Try reading quick session cookie ONLY if it has an active tenantId
  const sessionStr = await getCookies("userSession");
  if (sessionStr) {
    try {
      const parsed = JSON.parse(sessionStr);
      if (parsed?.id && parsed?.role && parsed?.tenantId) {
        return parsed as User;
      }
    } catch {
      // ignore
    }
  }

  // 2. Fetch live profile from backend
  try {
    const res = await serverFetch.get("/api/v1/tenant/me");
    if (res.ok) {
      const data = await res.json();
      if (data?.user) return data.user as User;
      if (data?.id) {
        // Returned tenant data: construct valid seller user object
        const resolvedUser: User = {
          id: data.id,
          phone: data.phone || "",
          name: data.name,
          role: "SELLER_OWNER",
          tenantId: data.id,
          loyaltyPoints: 0,
          totalDelivered: 0,
          totalReturned: 0,
        };
        const { setCookie } = await import("./tokenHandler");
        const { getDefaultCookieOptions } = await import("./cookieOptions");
        await setCookie("userSession", JSON.stringify(resolvedUser), {
          ...getDefaultCookieOptions({ httpOnly: false }),
          maxAge: 7 * 24 * 60 * 60,
        });
        return resolvedUser;
      }
    }
  } catch (err) {
    console.warn("Live getMe fetch failed:", err);
  }

  // Fallback to sessionStr if at least authenticated
  if (sessionStr) {
    try {
      const parsed = JSON.parse(sessionStr);
      if (parsed?.id) return parsed as User;
    } catch {
      // ignore
    }
  }

  return null;
}
