'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateOrder, VerifyOrder } from '../../app/dashboard/customer/action';

export default function CheckoutModal({ isOpen, onClose, cartData, onSuccess }) {
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cachedOrder, setCachedOrder] = useState(null);
  if (!isOpen) return null;
  
  const subtotal = cartData?.subtotal || 0;
  const shippingFee = cartData?.shippingFee || 0;
  const total = cartData?.total || subtotal + shippingFee;
  const itemCount = cartData?.itemCount || 0;

   useEffect(()=>{
    const razorpayScript =document.querySelector("#razorpay_script")
    if(razorpayScript) return
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.id = "razorpay_script"
    document.body.appendChild(script)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return;

    setErrorMessage('');
    setLoading(true);

    try {
        let orderData = cachedOrder;

      if (typeof window === 'undefined' || !window.Razorpay) {
        setErrorMessage('Razorpay SDK failed to load. Please refresh the page and try again.');
        setLoading(false);
        return;
      }
      if (!orderData) {
        const orderInit = await CreateOrder(); 
      if (!orderInit?.success || !orderInit?.order) {
        setErrorMessage(orderInit?.error || 'Failed to initiate payment.');
        setLoading(false);
        return;
      }
       orderData = orderInit;
      setCachedOrder(orderInit);
      }
       
      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        cartData,
        shippingFee:shippingFee,
        name: "Zoka Shop",
        description: "Complete your order purchase",
        order_id: orderData.order.id,
        theme: {
          color: '#00B976',
        },
        
        handler: async function (response) {
           
          const result = await VerifyOrder({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            shippingAddress: shippingAddress,
          });
          
          if (result.success) {
            setCachedOrder(null); 
            onSuccess?.();
            router.push('/dashboard/customer/order');
          } else {
            setErrorMessage(result.error || 'Payment verification failed.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        },
      };

      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();

    } catch (err) {
      console.error(err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-lg w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
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
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
              {errorMessage}
            </div>
          )}

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

          <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs text-slate-600 border border-slate-100">
            <div className="flex justify-between items-center">
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Shipping Fee</span>
              <span className="font-bold text-[#00B976]">
                {subtotal>= 1000 ? 'FREE' : `₹50`}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Payable</span>
              <span className="text-[#00B976]">₹{(subtotal+(subtotal>=1000?0:50)).toFixed(2)}</span>
            </div>
          </div>

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