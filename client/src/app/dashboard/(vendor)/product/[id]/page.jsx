"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductsById } from "../action";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        
        const result = await ProductsById(id);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to fetch product details");
        }
        
        const data = result.product;
        setProduct(data);
       
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-500 font-medium">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 max-w-4xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 rounded-xl">
        <h3 className="font-bold text-lg">Error Loading Product</h3>
        <p className="mt-1">{error || "Product could not be found."}</p>
        <button 
          onClick={() => router.back()} 
          className="mt-4 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button 
            onClick={() => router.back()} 
            className="text-slate-500 cursor-pointer hover:text-slate-800 text-sm font-medium flex items-center gap-1 mb-2"
          >
            <span><ArrowLeft size={20} /></span> Back to Products
          </button>
          <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Product Details</h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square relative rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              {activeImage ? (
                <img 
                  src={activeImage} 
                  alt={product.title} 
                  className="w-full h-full object-contain max-h-[450px]"
                />
              ) : (
                <div className="text-slate-400 text-sm">No Image Available</div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-1">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-lg border overflow-hidden p-1 bg-white transition ${
                      activeImage === imgUrl 
                        ? "border-emerald-500 ring-2 ring-emerald-500/10" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium uppercase rounded-md mb-4">
                {product.category || "General"}
              </span>

              <h2 className="text-[20px] font-bold text-green-700 mb-2 leading-tight">
                {product.title}
              </h2>
              
              {product.vendorId && (
                <p className="text-sm text-slate-500 mb-6">
                  Managed by <span className="font-semibold text-slate-700">{product.vendorId.name}</span> ({product.vendorId.email})
                </p>
              )}

              <hr className="border-slate-100 mb-6" />

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
                <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                  {product.description || "No description provided for this product."}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Price Point</span>
                <span className="text-xl font-extrabold text-emerald-600">
                  ₹{product.price?.toFixed(2)}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Availability</span>
                <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${
                  product.stock > 10 
                    ? "bg-emerald-50 text-emerald-700" 
                    : product.stock > 0 
                    ? "bg-amber-50 text-amber-700" 
                    : "bg-red-50 text-red-700"
                }`}>
                  {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>                         
        </div>
      </div>
    </div>
  );
}