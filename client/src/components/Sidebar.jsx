"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "../hooks/useLogout";

const navItems = [
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 ${isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
        />
      </svg>
    ),
  },
  {
    name: "Products",
    href: "/dashboard/product",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 ${isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 ${isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: (isActive) => (
      <svg
        className={`w-5 h-5 ${isActive ? "text-slate-700" : "text-slate-400 group-hover:text-slate-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  }
];

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <aside className="w-64 border-r border-slate-100 bg-white flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800 text-lg tracking-tight select-none">
            Foundry Shop
          </span>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#ecf3fe] text-[#0f4bb4] shadow-sm shadow-blue-500/5"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {item.icon(isActive)}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold border border-slate-100 shadow-inner">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {user?.name || "Vendor User"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || "vendor@store.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {isLoggingOut ? (
            "Logging out..."
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
