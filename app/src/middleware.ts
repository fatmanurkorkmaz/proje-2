import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/admin')) {
        const authCookie = request.cookies.get('admin_auth');
        console.log(`[Middleware] Path: ${path}, Cookie: ${authCookie?.value}`);

        if (!authCookie || authCookie.value !== 'true') {
            console.log('[Middleware] Unauthorized, redirecting to /admin/login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
