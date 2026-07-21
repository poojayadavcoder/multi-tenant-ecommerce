'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutOrder } from '../../app/dashboard/customer/action';

export default function CheckoutModal({ isOpen, onClose, cartData, onSuccess }) {
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cartData?.subtotal || 1099.94;
  const shippingFee = cartData?.shippingFee || 0;
  const total = cartData?.total || subtotal + shippingFee;
  const itemCount = cartData?.itemCount || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return;

    setErrorMessage('');
    setLoading(true);

    try {
      const result = await CheckoutOrder(shippingAddress);

      if (result.success) {
        onSuccess?.();
        router.push('/dashboard/customer/order');
      } else {
        setErrorMessage(result.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-lg w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Complete Your Order</h2>
            <p className="text-xs text-slate-500 mt-0.5">Enter shipping details to place order</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

          {/* Shipping Address Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Shipping Address <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="e.g. 123 Main Street, New York, NY 10001"
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00B976] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Mini Order Summary */}
          <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-600 border border-slate-100">
            <div className="flex justify-between items-center">
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Shipping Fee</span>
              <span className="font-bold text-[#00B976]">
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Payable</span>
              <span className="text-[#00B976]">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-1/3 py-3 px-4 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !shippingAddress.trim()}
              className="w-2/3 py-3 px-4 bg-[#00B976] hover:bg-[#00a368] text-white font-semibold text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Placing Order...</span>
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}