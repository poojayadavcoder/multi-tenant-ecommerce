"use client"
import { useLogout } from "../hooks/useLogout";

export default function VendorPendingScreen() {
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 mx-auto relative">
          <div className="absolute inset-0 rounded-full bg-orange-100 animate-pulse opacity-60" />
          <div className="relative w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
            <svg
              className="w-8 h-8 animate-spin [animation-duration:10s]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Application Under Review
        </h1>

        <p className="text-gray-500 text-[16px] mb-8 max-w-md mx-auto leading-relaxed">
          Thanks for submitting your shop details! Our team is currently
          reviewing your documentation to verify your business credentials.
        </p>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <p className="text-sm font-medium text-gray-700">
              Details Submitted Successfully
            </p>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold font-mono animate-pulse">
              ●
            </span>
            <p className="text-sm font-medium text-gray-900">
              Admin Reviewing Documents
            </p>
          </div>
          <div className="flex items-center space-x-3 opacity-40">
            <span className="w-5 h-5 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
              3
            </span>
            <p className="text-sm font-medium text-gray-500">
              Shop Activation & Onboarding
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-8 border-t border-gray-100 pt-6">
          <p>
            Estimated review window:{" "}
            <strong className="text-gray-700">24–48 hours</strong>.
          </p>
          <p className="mt-1">
            We will send an notification email to your registered address once
            approved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-gray-100 font-medium text-sm bg-red-800 rounded-[10px] px-3 py-2"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
