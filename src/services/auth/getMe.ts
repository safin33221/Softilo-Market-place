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

  // 1. Try reading quick session cookie
  const sessionStr = await getCookies("userSession");
  if (sessionStr) {
    try {
      const parsed = JSON.parse(sessionStr);
      if (parsed?.id && parsed?.role) {
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
      if (data?.id) return data as User;
    }
  } catch (err) {
    console.warn("Live getMe fetch failed:", err);
  }

  return null;
}
