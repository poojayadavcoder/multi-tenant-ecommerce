'use client';

import { useState, useEffect } from "react";
import { VendorOrders } from "./action";


export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await VendorOrders();
      console.log("Vendor Orders Response:", result);

      if (Array.isArray(result)) {
        setOrders(result.products);
      } else if (result?.success) {
        setOrders(result.products || result.data || []);
      } else {
        setError(result?.error || "Failed to load vendor orders.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready_for_pickup':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Fetching incoming orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between">
        <p className="text-sm font-medium">⚠️ {error}</p>
        <button 
          onClick={fetchOrders}
          className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage orders and prepare packages for pickup</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            Total Received: {orders.length}
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
            📦
          </div>
          <h3 className="text-base font-semibold text-gray-800">No Orders Found</h3>
          <p className="text-sm text-gray-500 mt-1">When customers order your products, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div 
                key={order._id} 
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition hover:shadow-md"
              >
                <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                      <span className="text-sm font-bold text-gray-900">#{order._id.slice(-8)}</span>
                    </div>
                    <p className="text-xs text-gray-500">📅 Placed on: {formattedDate}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                      ● {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 divide-y divide-gray-100">
                  {order.items?.map((item) => (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={item.productId?.images?.[0] || '/placeholder.png'} 
                          alt={item.productId?.title || 'Product'} 
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0 bg-gray-50"
                        />
                        
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                            {item.productId?.category || 'General'}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-800 leading-snug">
                            {item.productId?.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-md">
                            {item.productId?.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            Current Stock: <span className="font-semibold text-gray-600">{item.productId?.stock}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
                        <p className="text-xs text-gray-500">Qty: <span className="font-semibold text-gray-800">{item.quantity}</span></p>
                        <p className="text-xs font-semibold text-emerald-600 mt-1">
                          Item Total: ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Details</p>
                    <p className="text-xs text-gray-700 flex items-center gap-1 font-medium">
                      <span>📍 Address:</span> {order.shippingAddress}
                    </p>
                    <p className="text-xs text-gray-500">
                      👤 Customer ID: <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">{order.customer}</code>
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-gray-200">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold text-right">Vendor Subtotal</p>
                      <p className="text-lg font-extrabold text-emerald-600">₹{order.vendorSubtotal}</p>
                    </div>

                    <button 
                      onClick={() => alert(`Next step: Assign Delivery Partner for Order #${order._id.slice(-8)}`)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                    >
                      Assign Delivery Partner
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
