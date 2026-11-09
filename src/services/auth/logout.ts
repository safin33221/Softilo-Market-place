"use server";

import { deleteCookies } from "./tokenHandler";

/**
 * Logs out user by clearing server cookies.
 */
export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    await deleteCookies("accessToken");
    await deleteCookies("refreshToken");
    await deleteCookies("userSession");
    return {
      success: true,
      message: "সফলভাবে লগআউট হয়েছে",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "লগআউট ব্যর্থ হয়েছে",
    };
  }
}

