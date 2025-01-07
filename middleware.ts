import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT, LOGIN_PATH } from './routes';
import { getSession } from './lib/session';
/* 
BY DEFAULT EVERY ROUTES IS PROTECTED
[route]: `auth`, [user]: logged in ---> ⛔ deny & redirect
[route]: `auth`, [user]: not logged in --->✅ allow 
[route]: `private`, [user]: not logged in ---> ⛔ deny & redirect
[route]: `private`, [user]: logged in ---> ✅ allow
*/

export default async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const searchParams = request.nextUrl.searchParams;
	const isPublicRoute = publicRoutes.includes(pathname);
	const isAuthRoute = authRoutes.includes(pathname);

	// Simulate user authentication status (replace with actual logic)
	const session = await getSession();

	const userLoggedIn = !!session?.user;

	if (isPublicRoute) {
		return NextResponse.next(); // Allow public routes for all users
	}

	if (isAuthRoute) {
		if (userLoggedIn) {
			// If logged in, deny access and redirect
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl));
		}
		return NextResponse.next(); // Allow for non-logged-in users
	}

	// For all other routes (protected by default)
	if (!userLoggedIn) {
		// Deny access and redirect to login if not logged in
		if (pathname.startsWith('/book')) {
			const redirectTo = `/auth/login?redirect=${pathname}?${searchParams.toString()}`;
			return NextResponse.redirect(new URL(redirectTo, request.nextUrl));
		}
		return NextResponse.redirect(new URL(LOGIN_PATH, request.nextUrl));
	}

	return NextResponse.next(); // Allow for logged-in users
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
	]
};
// export const config = {
// 	matcher: [
// 		/*
// 		 * Match all request paths except for the ones starting with:
// 		 * - api (API routes)
// 		 * - _next/static (static files)
// 		 * - _next/image (image optimization files)
// 		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
// 		 */
// 		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
// 	]
// };
