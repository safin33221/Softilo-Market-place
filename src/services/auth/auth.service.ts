"use server"

import { verifyAccessToken } from "@/lib/jwtHandler"
import { serverFetch } from "@/lib/serverFetch"
import jwt, { JwtPayload } from "jsonwebtoken"
import { parseCookieString } from "@/lib/serverFetch"
import { getCookies } from "./tokenHandler"

type ParsedCookieMap = Record<string, string | undefined> | null

type TokenRefreshResult = {
    tokenRefreshed: boolean
    success: boolean
    accessToken?: string | null
    refreshToken?: string | null
    role?: JwtPayload["role"] | null
    message?: string
    accessTokenObject?: ParsedCookieMap
    refreshTokenObject?: ParsedCookieMap
}

const getAuthCookiesFromResponse = (response: Response) => {
    let accessTokenObject: ParsedCookieMap = null
    let refreshTokenObject: ParsedCookieMap = null

    const setCookieHeaders = response.headers.getSetCookie()

    if (setCookieHeaders?.length) {
        for (const cookie of setCookieHeaders) {
            const parsedCookie = parseCookieString(cookie)

            if (parsedCookie.accessToken) {
                accessTokenObject = parsedCookie
            }

            if (parsedCookie.refreshToken) {
                refreshTokenObject = parsedCookie
            }
        }
    }

    return { accessTokenObject, refreshTokenObject }
}

export async function getNewAccessToken(
    forceRefresh = false
): Promise<TokenRefreshResult> {
    const accessToken = await getCookies("accessToken")
    const refreshToken = await getCookies("refreshToken")

    if (!refreshToken) {
        return {
            tokenRefreshed: false,
            success: false,
            message: "Refresh token not found",
        }
    }

    if (!forceRefresh && accessToken) {
        const verifiedToken = await verifyAccessToken(accessToken)

        if (verifiedToken?.success) {
            const decodedToken = jwt.decode(accessToken) as JwtPayload | null

            return {
                tokenRefreshed: false,
                success: true,
                accessToken,
                refreshToken,
                role:
                    decodedToken && typeof decodedToken !== "string"
                        ? decodedToken.role
                        : null,
            }
        }
    }

    const res = await serverFetch.post("/auth/refresh-token")
    const result = await res.json().catch(() => null)

    if (!res.ok) {
        return {
            tokenRefreshed: false,
            success: false,
            message: result?.message || "Token refresh failed",
        }
    }

    const { accessTokenObject, refreshTokenObject } =
        getAuthCookiesFromResponse(res)

    if (!accessTokenObject?.accessToken) {
        throw new Error("Access token not found in refresh response")
    }

    const decodedToken = jwt.decode(accessTokenObject.accessToken) as
        | JwtPayload
        | string

    if (!decodedToken || typeof decodedToken === "string") {
        throw new Error("Invalid token format")
    }

    return {
        tokenRefreshed: true,
        success: true,
        accessToken: accessTokenObject.accessToken,
        refreshToken: refreshTokenObject?.refreshToken ?? refreshToken,
        accessTokenObject,
        refreshTokenObject,
        role: decodedToken.role,
        message: result?.message || "Token refreshed successfully",
    }
}
