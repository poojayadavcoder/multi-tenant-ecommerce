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

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Skip static files, images, and internal Next.js assets
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const endpoints = Endpoints();

  // 2. PREVENT INFINITE LOOP: Never run refresh logic if the request IS the refresh route itself
  if (pathname.includes("/refresh")) {
    return NextResponse.next();
  }

  let token = request.cookies.get("accessToken")?.value;
  let refreshToken = request.cookies.get("refreshToken")?.value;

  const tokenExpired = isTokenExpired(token);

  // Debug logs in terminal
  console.log(`[Middleware] Path: ${pathname}`);
  console.log(`[Middleware] Has Token: ${!!token}, Expired: ${tokenExpired}`);
  console.log(`[Middleware] Has Refresh Token: ${!!refreshToken}`);

  // 3. Trigger refresh if token is missing/expired AND refresh token exists
  if ((!token || tokenExpired) && refreshToken) {
    console.log("[Middleware] Attempting token refresh...");

    try {
      // ENSURE ABSOLUTE URL: Convert relative endpoints to absolute URLs if needed
      console.log(`[Middleware] Refresh Endpoint: ${endpoints.REFRESH_TOKEN}`);
      let refreshUrl = endpoints.REFRESH_TOKEN;
      if (refreshUrl.startsWith("/")) {
        refreshUrl = new URL(refreshUrl, request.url).href;
      }

      const r = await fetch(refreshUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      console.log(`[Middleware] Refresh Response Status: ${r}`);

      if (r.ok) {
        const data = await r.json();
        token = data.accessToken;
        refreshToken = data.refreshToken || refreshToken;
        console.log(token)
        console.log(refreshToken)

        console.log("[Middleware] Refresh successful! Updating cookies...");

        // Clone headers and update cookie header for downstream Server Components
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(
          "cookie",
          `accessToken=${token}; refreshToken=${refreshToken}`
        );

        const res = NextResponse.next({ request: { headers: requestHeaders } });

        // Update cookies in browser
        res.cookies.set("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60, // 15 mins
          path: "/",
        });

        res.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });

        return res;
      } else {
        console.log("[Middleware] Refresh endpoint rejected request.");
        token = null;
      }
    } catch (error) {
      console.error("[Middleware] Fetch error during refresh:", error.message);
      token = null;
    }
  }

  // 4. Redirect unauthenticated users on protected paths
  const protectedRoutes = ["/dashboard", "/become-seller"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if ((!token || tokenExpired) && isProtectedRoute) {
    console.log("[Middleware] Unauthenticated access to protected route. Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};