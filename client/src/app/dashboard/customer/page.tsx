import Products from '../../../components/customer/Products'
export default function CustomerDashboardPage() {
  return (
    <div className="relative min-h-[calc(100vh-73px)] w-full bg-white flex flex-col justify-start px-6 md:px-16 py-15 selection:bg-[#10B981]/25 select-none">
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-emerald-100/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl relative z-10">
        <h1 className="text-[2.75rem] sm:text-[4.5rem] md:text-[3.5rem] font-bold tracking-tight leading-[1.05] text-neutral-900 mb-6 md:mb-8">
          <span className="block">Welcome to <span className="text-[#10B981]">Zoka Market.</span></span>
        </h1>

        <p className="max-w-lg text-neutral-500 text-base md:text-[1.125rem] leading-relaxed mb-10 md:mb-12 font-normal">
          Discover a curated universe of premium lifestyle essentials, crafted items, and everyday gear—sourced directly from incredible creators.
        </p>

        <div className="flex flex-row flex-wrap items-center gap-4">
          <button className="bg-[#0E1322] hover:bg-[#1E2538] text-white font-medium text-sm md:text-base px-7 md:px-9 py-3.5 rounded-xl shadow-lg shadow-neutral-900/10 transition-all duration-200 transform active:scale-[0.98] cursor-pointer">
            Explore Products
          </button>
          
          <button className="bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-sm md:text-base px-7 md:px-9 py-3.5 rounded-xl border border-neutral-200/80 transition-all duration-200 transform active:scale-[0.98] cursor-pointer shadow-sm">
            View Categories
          </button>
        </div>
      </div>
      <Products/>
    </div>
  );
}