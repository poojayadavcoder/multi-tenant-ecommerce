import { NextResponse } from "next/server";
import Endpoints from "./constant/apiRoutes";

/**
 * Decodes JWT and checks if expired (Edge Runtime safe)
 */
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));

    if (!jsonPayload.exp) return false;
    // Expired if current time + 5s buffer exceeds exp
    return jsonPayload.exp * 1000 <= Date.now() + 5000;
  } catch (e) {
    return true; // Malformed token treated as expired
  }
}

// Define protected and public auth routes
const PROTECTED_ROUTES = ["/dashboard", "/become-seller", "/cart", "/orders", "/checkout"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, images, and internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Prevent infinite loop on token refresh requests
  if (pathname.includes("/refresh")) {
    return NextResponse.next();
  }

  let token = request.cookies.get("accessToken")?.value;
  let refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 2. IMMEDIATE REDIRECT: If accessing a protected route without ANY tokens, redirect to login instantly
  if (isProtectedRoute && !token && !refreshToken) {
    console.log(`[Middleware] No tokens found for protected route: ${pathname}. Immediate redirect.`);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const tokenExpired = isTokenExpired(token);

  // 3. REFRESH TOKEN FLOW: If access token is expired/missing BUT refresh token exists
  if ((!token || tokenExpired) && refreshToken) {
    console.log("[Middleware] Access token missing or expired. Attempting refresh...");

    try {
      const endpoints = Endpoints();
      let refreshUrl = endpoints.REFRESH_TOKEN;
      if (refreshUrl.startsWith("/")) {
        refreshUrl = new URL(refreshUrl, request.url).href;
      }

      const r = await fetch(refreshUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (r.ok) {
        const data = await r.json();
        token = data.accessToken;
        refreshToken = data.refreshToken || refreshToken;

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("cookie", `accessToken=${token}; refreshToken=${refreshToken}`);

        const res = NextResponse.next({ request: { headers: requestHeaders } });

        res.cookies.set("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60, // 1 min (or match backend)
          path: "/",
        });

        res.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });

        // If user was heading to login page with a now-refreshed token, send to dashboard
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return res;
      } else {
        console.log("[Middleware] Refresh failed/rejected by backend.");
        token = null;
        refreshToken = null;
      }
    } catch (error) {
      console.error("[Middleware] Refresh fetch failed:", error.message);
      token = null;
      refreshToken = null;
    }
  }

  // 4. CHECK PROTECTED ROUTES: If token refresh failed or token is still invalid
  if (isProtectedRoute && (!token || isTokenExpired(token))) {
    console.log(`[Middleware] Unauthorized access to ${pathname}. Redirecting to login.`);
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // Optional: remember where user was heading
    return NextResponse.redirect(loginUrl);
  }

  // 5. CHECK AUTH ROUTES: If user is logged in, prevent them from accessing login/register pages
  if (isAuthRoute && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};