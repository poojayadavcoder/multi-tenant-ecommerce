"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GetOrderForCustomer } from "../action"; 

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await GetOrderForCustomer();
        
        // Robust payload extraction across common API response formats
        let orderData = [];
        if (Array.isArray(res)) {
          orderData = res;
        } else if (res?.success) {
          if (Array.isArray(res.product)) orderData = res.product;
          else if (Array.isArray(res.orders)) orderData = res.orders;
          else if (res.product && typeof res.product === "object") orderData = [res.product];
          else if (res.orders && typeof res.orders === "object") orderData = [res.orders];
        } else if (res?.data && Array.isArray(res.data)) {
          orderData = res.data;
        }

        setOrders(orderData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Pending
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Processing
          </span>
        );
      case "delivered":
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#00b574] border border-emerald-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b574]"></span>
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
            {status || "Processing"}
          </span>
        );
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#00b574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-500 font-medium text-sm">Loading your orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-neutral-50 border border-dashed border-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">No Orders Found</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          You haven&apos;t placed any orders yet. Start exploring our collection!
        </p>
        <Link 
          href="/dashboard/customer" 
          className="inline-block bg-[#00b574] hover:bg-[#009e65] text-white font-semibold px-6 py-3 rounded-xl text-sm transition shadow-xs"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-sans">
      <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">My Orders</h1>
          <p className="text-xs text-neutral-500 mt-1">Check status and details of your past purchases</p>
        </div>
        <span className="text-xs font-semibold bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-lg">
          Total Orders: <span className="font-bold text-neutral-900">{orders.length}</span>
        </span>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const totalItemsCount = order.items?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;

          return (
            <div 
              key={order._id || Math.random()}
              className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition hover:border-neutral-300"
            >
              {/* Order Card Header */}
              <div className="bg-neutral-50/70 p-4 sm:p-5 border-b border-neutral-150 flex flex-wrap gap-4 items-center justify-between text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">Order ID</span>
                    <span className="font-mono font-semibold text-neutral-800">#{order._id ? order._id.slice(-8) : "N/A"}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">Date Placed</span>
                    <span className="font-semibold text-neutral-700">{formatDate(order.createdAt)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-0.5">Total Amount</span>
                    <span className="font-extrabold text-neutral-900 text-base">₹{Number(order.totalAmount || 0).toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 sm:p-6 divide-y divide-neutral-100">
                {order.items?.map((item, idx) => {
                  const product = item.productId || {};
                  const imageSrc = product.images?.[0] || "/placeholder.png";

                  return (
                    <div key={item._id || idx} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100 shrink-0">
                        <img 
                          src={imageSrc} 
                          alt={product.title || "Product Image"} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="grow min-w-0">
                        <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-bold block mb-0.5">
                          {product.category || "General"}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-neutral-800 truncate">
                          {product.title || "Product Unavailable"}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-neutral-500 line-clamp-1 mt-1 hidden sm:block">
                            {product.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-neutral-600">
                          <span>Qty: <strong className="text-neutral-800 font-semibold">{item.quantity || 1}</strong></span>
                          <span>Price: <strong className="text-neutral-800 font-semibold">₹{Number(item.price || product.price || 0).toFixed(2)}</strong></span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-neutral-400 block mb-0.5">Subtotal</span>
                        <span className="text-sm sm:text-base font-extrabold text-neutral-900">
                          ₹{(Number(item.price || product.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Footer */}
              <div className="bg-neutral-50/40 px-4 sm:px-6 py-3.5 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    Shipping to: <strong className="text-neutral-800 font-medium">{order.shippingAddress || "N/A"}</strong>
                  </span>
                </div>

                <div className="text-neutral-400 font-medium text-[11px]">
                  {totalItemsCount} item{totalItemsCount > 1 ? "s" : ""} in this order
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}