import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { siteConfig } from './config/site';

/**
 * Domain & Subdomain Routing Proxy/Middleware
 * Handles:
 * 1. seller.domain.com / seller.localhost:3000 -> Rewrites to /seller/*
 * 2. [tenant].domain.com -> Rewrites to /store/[tenant]/*
 * 3. Central domain -> /
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // 1. Seller Portal: seller.softilo.com or seller.localhost:3000
  if (
    hostname.startsWith(`${siteConfig.sellerSubdomainPrefix}.`) ||
    hostname.startsWith('seller.')
  ) {
    if (!url.pathname.startsWith('/seller')) {
      return NextResponse.rewrite(new URL(`/seller${url.pathname}`, req.url));
    }
    return NextResponse.next();
  }

  // 2. Custom Tenant Subdomain
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
      if (!url.pathname.startsWith('/store/')) {
        return NextResponse.rewrite(new URL(`/store/${subdomain}${url.pathname}`, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

