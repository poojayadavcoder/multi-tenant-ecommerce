import { Products } from './action';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images?: string;
  category?: string;
  stock?: number;
}

export default async function ProductsPage() {
  const result = await Products();
  const products: Product[] = result.success && Array.isArray(result.products) ? result.products : [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor your live store items.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-sm transition shadow-md shadow-emerald-500/10">
          + Add New Product
        </button>
      </div>

      {!result.success && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm">
          {result.error || "Failed to load products. Please refresh."}
        </div>
      )}

      {products.length === 0 && result.success && (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No products yet</h3>
          <p className="text-gray-500 text-xs mb-6">Let's create your first item listings and get selling!</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                {product.images[0] ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
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
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Price</span>
                    <strong className="text-emerald-600 font-bold text-lg">${Number(product.price).toFixed(2)}</strong>
                  </div>
                  
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    product.stock && product.stock > 0 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-rose-50 text-rose-600'
                  }`}>
                    {product.stock && product.stock > 0 ? `${product.stock} In Stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}