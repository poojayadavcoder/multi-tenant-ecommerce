"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GetCart, UpdateCart, DeleteCart } from "../action";
import CheckoutModal from "../../../../components/customer/CheckoutModal";


export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const res = await GetCart();
      if (res?.success) {
        setCart(res.product?.items || []);
      }
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = async (productId, currentQty, targetQty, stockLimit) => {
    if (targetQty < 1) return;
    if (targetQty > stockLimit) {
      alert(`Only ${stockLimit} items available in stock.`);
      return;
    }

    setUpdatingId(productId);
    const res = await UpdateCart(productId, targetQty);
    if (res?.success) {
      await fetchCartData();
    } else {
      alert(res?.error || "Could not update quantity.");
    }
    setUpdatingId(null);
  };

  const handleRemoveItem = async (productId) => {
    if (!confirm("Are you sure you want to remove this item from your bag?")) return;
    
    setUpdatingId(productId);
    const res = await DeleteCart(productId);
    if (res?.success) {
      await fetchCartData();
    } else {
      alert(res?.error || "Could not remove item.");
    }
    setUpdatingId(null);
  };

  const items = cart || [];

  // Calculate Subtotal & Total Quantities
  const subtotal = items.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const orderTotal = subtotal + shippingFee;

  if (loading && !cart) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-[#00b574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-500 font-medium">Loading your shopping bag...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-neutral-50 border border-dashed border-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Looks like you haven&apos;t added any items to your collection yet.
        </p>
        <Link 
          href="/dashboard/customer" 
          className="inline-block bg-[#00b574] hover:bg-[#009e65] text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-neutral-800 tracking-tight mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => {
            const product = item.productId;
            if (!product) return null;

            const isItemUpdating = updatingId === product._id;

            return (
              <div 
                key={item._id} 
                className={`flex gap-4 md:gap-6 p-4 md:p-6 bg-white rounded-xl border border-neutral-100 shadow-xs transition ${
                  isItemUpdating ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="w-24 h-28 md:w-28 md:h-32 bg-neutral-50 rounded-lg overflow-hidden border border-neutral-100 shrink-0">
                  <img 
                    src={product.images?.[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between grow">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-bold">
                        {product.category}
                      </span>

                      <button 
                        onClick={() => handleRemoveItem(product._id)}
                        className="text-neutral-400 hover:text-rose-600 transition p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-neutral-800 line-clamp-2 mt-0.5">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden h-9">
                      <button 
                        onClick={() => handleQuantityChange(product._id, item.quantity, item.quantity - 1, product.stock)}
                        className="px-3 bg-neutral-50 hover:bg-neutral-100 transition text-neutral-600 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold text-sm text-neutral-800 w-10 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(product._id, item.quantity, item.quantity + 1, product.stock)}
                        className="px-3 bg-neutral-50 hover:bg-neutral-100 transition text-neutral-600 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-neutral-400 block mb-0.5">
                        ₹{Number(product.price).toFixed(2)} each
                      </span>
                      <span className="text-base font-extrabold text-neutral-900">
                        ₹{(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-50 rounded-2xl border border-neutral-150 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-neutral-900 mb-5">Order Summary</h2>

            <div className="space-y-4 text-sm text-neutral-600 border-b border-neutral-200 pb-5">
              <div className="flex justify-between">
                <span>Subtotal ({totalQuantity} items)</span>
                <span className="font-semibold text-neutral-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-semibold uppercase text-xs">Free</span>
                ) : (
                  <span className="font-semibold text-neutral-900">₹{shippingFee.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center py-5 mb-5">
              <span className="text-base font-bold text-neutral-900">Order Total</span>
              <span className="text-xl font-black text-neutral-900">₹{orderTotal.toFixed(2)}</span>
            </div>

            {subtotal < 500 && (
              <p className="text-[11px] text-neutral-500 mb-5 text-center leading-relaxed">
                Add <span className="font-bold text-emerald-600">₹{(500 - subtotal).toFixed(2)}</span> more to unlock <span className="font-bold text-emerald-600">Free Shipping</span>!
              </p>
            )}

            <button
              className="w-full bg-[#00b574] hover:bg-[#009e65] text-white font-semibold py-3.5 rounded-xl transition text-center block text-sm shadow-xs select-none cursor-pointer"
              onClick={() => setShowPopup(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>

      {showPopup && (
        <CheckoutModal
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          cartData={{
            subtotal,
            shippingFee,
            total: orderTotal,
            itemCount: totalQuantity
          }}
          onSuccess={() => {
            setShowPopup(false);
            router.push('/dashboard/customer/order');
          }}
        />
      )}
    </div>
  );
}