import React from "react";

export default function OverviewPage() {
  const checklistItems = [
    { id: 1, label: "Verify identity documents", completed: true },
    { id: 2, label: "Connect payment gateway", completed: true },
    { id: 3, label: "Configure tax settings", completed: true },
    { id: 4, label: "Review shop policies", completed: true },
    { id: 5, label: "Add your first product", completed: false },
  ];
   
  const stats = [
    { label: "TOTAL REVENUE", value: "$0.00", badge: "No data yet" },
    { label: "TOTAL SALES", value: "0", badge: "No data yet" },
    { label: "STORE VISITS", value: "0", badge: "No data yet" },
  ];
   
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-400 rounded-3xl p-8 md:p-10 text-white shadow-lg shadow-teal-500/10">
        {/* Subtle Decorative Background Bubbles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight select-none">
            Your Shop is Live!
          </h1>
          <p className="text-teal-50/90 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
            Welcome to your new digital storefront. Start adding products to see your first sales.
          </p>
        </div>
      </div>

      {/* Main Grid: Checklist & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Setup Checklist */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                Setup Checklist
              </h2>
              <span className="text-xs md:text-sm text-slate-400 font-semibold">
                4 of 5 complete
              </span>
            </div>

            <div className="space-y-3">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3.5 px-5 py-4 rounded-2xl border transition-all duration-300 ${
                    item.completed
                      ? "bg-emerald-50/20 border-emerald-100/50"
                      : "bg-slate-50/30 border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {item.completed ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0" />
                  )}
                  
                  <span
                    className={`text-sm font-semibold select-none ${
                      item.completed
                        ? "text-emerald-700/95 line-through decoration-emerald-500/60"
                        : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end">
            <button className="px-5 py-2.5 rounded-xl bg-slate-905 bg-slate-900 text-white font-semibold text-xs tracking-wide hover:bg-slate-800 transition-all duration-200 shadow-sm select-none cursor-pointer">
              Go to Settings
            </button>
          </div>
        </div>

        {/* Right Side: Stats Panel */}
        <div className="space-y-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl p-8 border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-305 flex flex-col justify-between h-[155px]"
            >
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-slate-800 tracking-tight mt-1 select-none">
                  {stat.value}
                </p>
              </div>
              <span className="inline-flex bg-slate-50 text-slate-400 text-[10px] font-bold tracking-wide px-3 py-1 rounded-full w-max border border-slate-100 select-none">
                {stat.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
