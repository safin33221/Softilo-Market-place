import { getCookies, setCookie } from "@/services/auth/tokenHandler"
import { getDefaultCookieOptions } from "@/services/auth/cookieOptions"

/**
 * Universal cookie parser helper for Set-Cookie header strings
 */
export function parseCookieString(cookieStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieStr) return result;
  
  cookieStr.split(';').forEach((part, index) => {
    const [rawKey, ...rawVal] = part.trim().split('=');
    if (rawKey) {
      const key = rawKey.trim();
      const val = rawVal.join('=').trim();
      result[key] = val ? decodeURIComponent(val) : '';
      if (index === 0) {
        result.name = key;
        result.value = result[key];
      }
    }
  });
  return result;
}

const BackendURL =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000"

const buildRequestUrl = (endpoint: string): string | null => {
    if (!BackendURL) {
        return null
    }

    try {
        const normalizedBase = BackendURL.endsWith("/")
            ? BackendURL
            : `${BackendURL}/`
        let normalizedEndpoint = endpoint.startsWith("/")
            ? endpoint.slice(1)
            : endpoint

        // Auto-prefix api/v1 if not already present
        if (!normalizedEndpoint.startsWith("api/v1") && !normalizedEndpoint.startsWith("api/")) {
            normalizedEndpoint = `api/v1/${normalizedEndpoint}`;
        }

        return new URL(normalizedEndpoint, normalizedBase).toString()
    } catch {
        return null
    }
}

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = await getCookies("refreshToken")
    if (!refreshToken) return null

    const requestUrl = buildRequestUrl("/api/v1/auth/refresh-token")
    if (!requestUrl) return null

    const res = await fetch(requestUrl, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
    })

    if (!res.ok) return null

    let accessTokenObject: Record<string, string | undefined> | null = null
    let refreshTokenObject: Record<string, string | undefined> | null = null

    const setCookieHeaders = res.headers.getSetCookie()
    if (setCookieHeaders?.length) {
        for (const cookie of setCookieHeaders) {
            const parsedCookie = parseCookieString(cookie)
            if (parsedCookie.accessToken || parsedCookie.name === 'accessToken') {
                accessTokenObject = { ...parsedCookie, accessToken: parsedCookie.accessToken || parsedCookie.value }
            }
            if (parsedCookie.refreshToken || parsedCookie.name === 'refreshToken') {
                refreshTokenObject = { ...parsedCookie, refreshToken: parsedCookie.refreshToken || parsedCookie.value }
            }
        }
    }

    if (!accessTokenObject?.accessToken) return null

    try {
        await setCookie("accessToken", accessTokenObject.accessToken, {
            ...getDefaultCookieOptions(),
            maxAge: Number(accessTokenObject["Max-Age"]) || 3600,
        })

        if (refreshTokenObject?.refreshToken) {
            await setCookie("refreshToken", refreshTokenObject.refreshToken, {
                ...getDefaultCookieOptions(),
                maxAge: Number(refreshTokenObject["Max-Age"]) || 7776000,
            })
        }
    } catch (error) {
        console.warn("Unable to update cookies in this context:", error)
    }

    return accessTokenObject.accessToken
}

const serverFetchHelper = async (
    endpoint: string,
    options: RequestInit,
    allowRetry = true
): Promise<Response> => {
    const { headers, ...restOptions } = options
    const accessToken = await getCookies("accessToken")
    const refreshToken = await getCookies("refreshToken")
    const requestUrl = buildRequestUrl(endpoint)

    if (!requestUrl) {
        console.error("Server fetch error: Backend URL is missing or invalid")
        return new Response(
            JSON.stringify({
                success: false,
                message: "Backend URL is missing or invalid",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        )
    }

    const requestHeaders = new Headers(headers)
    const authCookies = [
        accessToken ? `accessToken=${accessToken}` : null,
        refreshToken ? `refreshToken=${refreshToken}` : null,
    ].filter(Boolean)

    if (authCookies.length > 0) {
        requestHeaders.set("Cookie", authCookies.join("; "))
    }

    // Default Authorization Bearer header if accessToken exists
    if (accessToken && !requestHeaders.has("Authorization")) {
        requestHeaders.set("Authorization", `Bearer ${accessToken}`)
    }

    try {
        const response = await fetch(requestUrl, {
            headers: requestHeaders,
            cache: restOptions.cache ?? "no-store",
            ...restOptions
        })
        if (response.status === 401 && refreshToken && allowRetry) {
            const newAccessToken = await refreshAccessToken()
            if (newAccessToken) {
                const retryHeaders = new Headers(headers)
                retryHeaders.set("Authorization", `Bearer ${newAccessToken}`)
                retryHeaders.set(
                    "Cookie",
                    [
                        `accessToken=${newAccessToken}`,
                        refreshToken ? `refreshToken=${refreshToken}` : null,
                    ]
                        .filter(Boolean)
                        .join("; ")
                )
                return serverFetchHelper(endpoint, { ...restOptions, headers: retryHeaders }, false)
            }
        }

        // Clean up invalid session if unauthorized
        if (response.status === 401) {
            try {
                const { deleteCookies } = await import("@/services/auth/tokenHandler");
                await deleteCookies("accessToken");
                await deleteCookies("userSession");
            } catch {
                // In non-mutable contexts (e.g. static render), cookies cannot be mutated
            }
        }

        return response
    } catch (error) {
        console.error("Server fetch network error:", error)
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to connect to backend service",
            }),
            {
                status: 503,
                headers: { "Content-Type": "application/json" },
            }
        )
    }
}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),
    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),
    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),
    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),
    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
}
