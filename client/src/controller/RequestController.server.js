"use server";

import { cookies } from "next/headers";

/**
 * Reusable HTTP Request Controller for Server-side Fetching
 * @param {string} url 
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method 
 * @param {Object} [options] 
 */
export async function request(url, method = "GET", options = {}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const requestHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache,
      next: options.next,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data?.message || "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      status: res.status,
      data,
    };
  } catch (error) {
    console.error(`[RequestController Error - ${method} ${url}]:`, error);
    return {
      success: false,
      error: "Internal server error. Please try again.",
    };
  }
} 