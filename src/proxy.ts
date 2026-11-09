import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from './config/site';

interface DecodedToken {
  id?: string;
  phone?: string;
  role?: string;
  tenantId?: string;
  exp?: number;
}

/**
 * Lightweight, universals-safe JWT decoder for Edge & Node proxy runtimes.
 * Validates base64 structure and token expiration without heavyweight node crypto.
 */
function decodeJwtPayload(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Checks whether the JWT token exists and has not expired.
 */
function verifyToken(token: string | undefined): { valid: boolean; payload?: DecodedToken } {
  if (!token || typeof token !== 'string') return { valid: false };
  const payload = decodeJwtPayload(token);
  if (!payload) return { valid: false };
  if (payload.exp && payload.exp * 1000 < Date.now()) {
    return { valid: false };
  }
  return { valid: true, payload };
}

/**
 * Applies security best-practice headers to outgoing responses.
 */
function applySecurityHeaders(res: NextResponse) {
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

/**
 * Next.js 16 Proxy / Middleware
 * Enforces route authorization, token expiration, guest-only restrictions, and secure headers.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const hostname = req.headers.get('host') || '';

  // 1. Read and verify accessToken from cookies
  const accessToken = req.cookies.get('accessToken')?.value;
  const auth = verifyToken(accessToken);

  // Read secondary userSession cookie for newly linked tenantId synchronization
  const userSessionStr = req.cookies.get('userSession')?.value;
  let userSessionTenantId: string | undefined;
  if (userSessionStr) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userSessionStr));
      if (parsed?.tenantId) {
        userSessionTenantId = parsed.tenantId;
      }
    } catch {
      // ignore
    }
  }

  const effectiveTenantId = auth.payload?.tenantId || userSessionTenantId;

  // 2. Protected Seller Routes Guard (/seller/*, /dashboard/*)
  const isSellerRoute = pathname.startsWith('/seller') || pathname.startsWith('/dashboard');

  if (isSellerRoute) {
    if (!auth.valid) {
      // Unauthenticated or expired token -> Redirect immediately to /login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      const redirectRes = NextResponse.redirect(loginUrl);

      // Wipe stale/expired auth cookies
      redirectRes.cookies.delete('accessToken');
      redirectRes.cookies.delete('userSession');
      return redirectRes;
    }

    // Authenticated user with no shop trying to access dashboard -> Redirect to onboarding
    if (!effectiveTenantId) {
      return NextResponse.redirect(new URL('/onboard', req.url));
    }
  }

  // 3. Guest-Only Route Guard (/login)
  // If user is already logged in, prevent accessing login page
  if (pathname === '/login') {
    if (auth.valid) {
      if (effectiveTenantId) {
        return NextResponse.redirect(new URL('/seller/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/onboard', req.url));
      }
    }
  }

  // 4. Onboard Route Guard
  // If user is already authenticated AND already has an active shop, redirect to dashboard
  if (pathname === '/onboard') {
    if (auth.valid && effectiveTenantId) {
      return NextResponse.redirect(new URL('/seller/dashboard', req.url));
    }
  }

  // 5. Hostname & Subdomain Routing
  // Seller Portal: seller.softilo.com or seller.localhost:3000
  if (
    hostname.startsWith(`${siteConfig.sellerSubdomainPrefix}.`) ||
    hostname.startsWith('seller.')
  ) {
    if (
      !pathname.startsWith('/seller') &&
      !pathname.startsWith('/login') &&
      !pathname.startsWith('/onboard')
    ) {
      const rewritten = NextResponse.rewrite(new URL(`/seller${pathname}`, req.url));
      applySecurityHeaders(rewritten);
      return rewritten;
    }
  }

  // Custom Tenant Subdomain: [store].softilo.com -> /store/[store]/*
  const isLocalhost = hostname.includes('localhost');
  const parts = hostname.split('.');
  if (parts.length > (isLocalhost ? 1 : 2)) {
    const subdomain = parts[0];
    if (
      subdomain !== 'www' &&
      subdomain !== 'seller' &&
      subdomain !== 'admin' &&
      subdomain !== 'api'
    ) {
      if (!pathname.startsWith('/store/')) {
        const rewritten = NextResponse.rewrite(new URL(`/store/${subdomain}${pathname}`, req.url));
        applySecurityHeaders(rewritten);
        return rewritten;
      }
    }
  }

  const response = NextResponse.next();
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

