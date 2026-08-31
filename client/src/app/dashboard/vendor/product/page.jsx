"use client";

import { useState, useEffect } from 'react';
import { VendorProducts, DeleteProduct } from './action';
import Image from 'next/image';
import Link from "next/link";
import ProductFormModal from './ProductFormModal';

function PencilIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await VendorProducts();
      
      if (result.success) setProducts(result.products || []);
      else setError(result.error || "Failed to load products.");
    } catch {
      setError("An unexpected error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEdit = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const openDelete = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteProduct(product);
    setDeleteError("");
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setDeleteProduct(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const res = await DeleteProduct(deleteProduct._id);
      if (res.success) {
        handleDeleteClose();
        fetchProducts();
      } else {
        setDeleteError(res.error || "Failed to delete product.");
      }
    } catch {
      setDeleteError("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      <div className="flex justify-between items-center border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 animate-slide-down">Your Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your live store items.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition shadow-md shadow-emerald-500/10 cursor-pointer"
        >
          + Add New Product
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48 text-slate-500 font-medium">
          <svg className="animate-spin h-6 w-6 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading your product listings...
        </div>
      ) : (
        <>
          {products.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No products yet</h3>
              <p className="text-gray-500 text-xs mb-6">Let's create your first item listings and get selling!</p>
              <button onClick={openCreate} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs transition">
                Create Listing
              </button>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (

                <div key={product._id} className="relative group">

                  <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">

                    <button
                      onClick={(e) => openEdit(e, product)}
                      title="Edit product"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-blue-600 hover:text-white shadow-md transition-all duration-150 cursor-pointer border border-blue-100 hover:border-blue-600"
                    >
                      <PencilIcon />
                    </button>
                   
                    <button
                      onClick={(e) => openDelete(e, product)}
                      title="Delete product"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm text-rose-500 hover:bg-rose-500 hover:text-white shadow-md transition-all duration-150 cursor-pointer border border-rose-100 hover:border-rose-500"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <Link href={`/dashboard/vendor/product/${product._id}`} className="block h-full">
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {product.category && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase text-gray-600 rounded-lg shadow-sm">
                            {product.category}
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description || "No description provided."}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Price</span>
                            <strong className="text-emerald-600 font-bold text-lg">₹{Number(product.price).toFixed(2)}</strong>
                          </div>
                          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                            product.stock && product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {product.stock && product.stock > 0 ? `${product.stock} In Stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-sm p-8 flex flex-col items-center text-center relative">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h2>
            <p className="text-sm text-gray-500 mb-1">
              You are about to permanently delete
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-6 line-clamp-1 px-4">
              "{deleteProduct?.title}"
            </p>
            <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>

            {deleteError && (
              <div className="w-full p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold mb-4">{deleteError}</div>
            )}

            <div className="flex gap-3 w-full">
              <button
                onClick={handleDeleteClose}
                disabled={isDeleting}
                className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-sm transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}