/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFetch";
import { getDefaultDashboard } from "@/lib/auth-utils";
import { IUserRole } from "@/types/user/user";
import { parseCookieString } from "@/lib/serverFetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultCookieOptions } from "./cookieOptions";
import { setCookie } from "./tokenHandler";

export const login = async (
    _prevState: unknown,
    formData: FormData
): Promise<{
    success: boolean;
    message: string;
    data?: any;
    redirectTo?: string;
}> => {
    try {
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const callbackUrl = String(
            formData.get("callbackUrl") || formData.get("redirect") || ""
        ).trim();

        const payload = {
            email: String(formData.get("email") || "").trim(),
            password: String(formData.get("password") || ""),
        };

        if (!payload.email || !payload.password) {
            return {
                success: false,
                message: "Email and password are required",
            };
        }

        const res = await serverFetch.post("/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "failed to login account",
            };
        }

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 1) {
            setCookieHeaders.forEach((cookie: string) => {
                const parseCookie = parseCookieString(cookie);

                if (parseCookie.accessToken) {
                    accessTokenObject = parseCookie;
                }

                if (parseCookie.refreshToken) {
                    refreshTokenObject = parseCookie;
                }
            });
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject || !refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await setCookie("accessToken", accessTokenObject.accessToken, {
            ...getDefaultCookieOptions(),
            maxAge: Number(accessTokenObject["Max-Age"]) || 3600,
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            ...getDefaultCookieOptions(),
            maxAge: Number(refreshTokenObject["Max-Age"]) || 7776000,
        });

        const decodedToken = jwt.decode(
            accessTokenObject.accessToken
        ) as JwtPayload | string;

        if (!decodedToken || typeof decodedToken === "string") {
            throw new Error("Invalid token format");
        }

        const defaultDashboard = getDefaultDashboard(
            decodedToken.role as IUserRole
        );

        const isSafeCallback =
            callbackUrl.startsWith("/") &&
            !callbackUrl.startsWith("//") &&
            !callbackUrl.includes("://");

        return {
            success: true,
            message: "Login successful",
            redirectTo: isSafeCallback ? callbackUrl : defaultDashboard,
        };
    } catch (error: any) {
        console.error("login error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
