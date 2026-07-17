"use client";

import { useEffect, useState } from "react";
import { AddToCart, Products as getProducts } from "../../app/dashboard/customer/action";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const result = await getProducts();
        if (result.success) {
          const list =
            result.product ||
            result.products ||
            (Array.isArray(result) ? result : []);
          setProducts(list);
        } else {
          setError(result.error || "Failed to load products");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);


  const handleConfirmAdd = async (id, qty) => {
    try {
      setAdding(true);
      
      const response = await AddToCart(id, qty);
      
      if (response.success) {
        setSelectedProduct(null);
        alert("Item added to bag successfully!");
      } else {
        alert(response.error || "Failed to add item to bag");
      }
    } catch (err) {
      console.error("Client Error adding to cart:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full mt-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 tracking-tight">
          Featured Items
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col animate-pulse">
              <div className="w-full aspect-4/5 bg-neutral-100 rounded-lg mb-3"></div>
              <div className="w-16 h-3 bg-neutral-150 rounded mb-2"></div>
              <div className="w-full h-4 bg-neutral-150 rounded mb-1"></div>
              <div className="w-24 h-4 bg-neutral-150 rounded mb-3"></div>
              <div className="w-full h-9 bg-neutral-150 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-12 bg-rose-50 border border-rose-100 p-5 rounded-xl text-center">
        <p className="text-sm font-semibold text-rose-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-xs font-bold text-rose-800 underline hover:no-underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full mt-12 border border-dashed border-neutral-200 rounded-xl p-12 text-center">
        <svg
          className="w-10 h-10 text-neutral-300 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p className="text-sm text-neutral-450">
          No products on display yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
          Our Collection
        </h2>
        <span className="text-xs font-semibold text-neutral-450 tracking-wider uppercase">
          {products.length} {products.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
        {products.map((product) => {
          const imageSrc =
            product.images && product.images[0] ? product.images[0] : null;

          return (
            <>
              {selectedProduct && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">

                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-neutral-900">
                        Select Quantity
                      </h3>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-neutral-400 hover:text-neutral-600 text-xl font-bold cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="flex gap-4 items-center mb-6 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                      <img
                        src={selectedProduct.images?.[0]}
                        alt={selectedProduct.title}
                        className="w-16 h-16 object-cover rounded-md bg-white border"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-800 line-clamp-1">
                          {selectedProduct.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          ₹{Number(selectedProduct.price).toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 mb-6">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 cursor-pointer rounded-full border border-neutral-300 flex items-center justify-center font-bold text-lg hover:bg-neutral-50 active:scale-95 transition"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold text-neutral-850 w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 cursor-pointer rounded-full border border-neutral-300 flex items-center justify-center font-bold text-lg hover:bg-neutral-50 active:scale-95 transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm px-1">
                        <span className="text-neutral-500 font-medium">
                          Subtotal:
                        </span>
                        <span className="text-neutral-900 font-bold text-base">
                          ₹{(selectedProduct.price * quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleConfirmAdd(selectedProduct._id, quantity)
                        }
                        disabled={adding}
                        className="w-full bg-[#00b574] hover:bg-[#009e65] disabled:bg-neutral-300 text-white font-semibold py-3 rounded-xl transition text-center cursor-pointer text-sm shadow-sm"
                      >
                        {adding ? "Adding to Bag..." : `Add ${quantity} to Bag`}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                key={product._id}
                className="group flex flex-col justify-between"
              >
                <Link href={`/dashboard/customer/${product._id}`}>
                  <div className="relative aspect-4/5 w-full bg-neutral-50 rounded-lg overflow-hidden border border-neutral-100 flex items-center justify-center">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.title}
                        className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-300 pointer-events-none"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-neutral-350">
                        <svg
                          className="w-8 h-8 opacity-40 mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold mb-1 mt-3.5 block">
                    {product.category || "General"}
                  </span>

                  <h3 className="text-sm font-semibold text-neutral-800 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <span className="text-sm text-neutral-550 font-medium mt-1 block">
                    ₹{product.price ? Number(product.price).toFixed(2) : "0.00"}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
                  }}
                  className="w-full mt-3.5 bg-[#00b574] hover:bg-[#009e65] active:bg-[#008656] text-white text-xs font-semibold py-2.5 rounded transition-colors text-center cursor-pointer transform active:scale-[0.99] select-none"
                >
                  Add to Bag
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
