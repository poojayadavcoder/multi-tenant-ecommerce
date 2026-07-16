"use client";

import Image from "next/image";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { applyVendor } from "./action";
import { useRouter } from "next/navigation";

export default function BecomeSellerPage() {
  const router = useRouter()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const formik = useFormik({
    initialValues: {
      shopName: "",
      shopDescription: "",
    },
    validationSchema: Yup.object({
      shopName: Yup.string().required("Shop Name is required"),
      shopDescription: Yup.string().required("Shop Description is required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        const result = await applyVendor(values);
        if (result.success) {
          setShowSuccessMsg(true);
          setTimeout(() => {
            router.push("/dashboard");
          }, 3500);
        } else {
          setError(result.error || "Registration failed.");
        }
      } catch (err) {
        console.error("Register component error:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {showSuccessMsg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(24px) scale(0.96); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
            .animate-fade-in {
              animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-slide-up {
              animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col items-center text-center relative overflow-hidden animate-slide-up">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-50 rounded-full blur-2xl pointer-events-none" />

            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-75 duration-1000" />
              <div className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Application Submitted Successfully!
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your shop details have been sent to our team. We are currently
              verifying your business credentials and will update you shortly!
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full max-w-md mx-auto p-2">
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Setup Your Shop
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Fill in your details to get started as a seller
              </p>
            </header>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <InputField
                  id="shopName"
                  name="shopName"
                  type="text"
                  label="Shop Name"
                  placeholder="Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shopName}
                  error={formik.errors.shopName}
                  touched={formik.touched.shopName}
                />
              </div>

              <div className="space-y-2 relative">
                <label
                  htmlFor="shopDescription"
                  className="block text-sm font-medium text-slate-700"
                >
                  Shop Description
                </label>
                <textarea
                  id="shopDescription"
                  name="shopDescription"
                  rows={4}
                  value={formik.values.shopDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Selling the best headsets and audio gear."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 font-normal text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-200 resize-none"
                />
                {formik.touched.shopDescription &&
                  formik.errors.shopDescription && (
                    <p className="text-red-500 text-sm absolute -bottom-2 left-2">
                      {formik.errors.shopDescription}
                    </p>
                  )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Shop..." : "Create Shop"}
              </button>
            </form>
          </div>

          <div className="relative w-full h-[300px] rounded-2xl hidden md:block">
            <Image
              src="/images/becomeSellerImg.png"
              alt="Become a seller"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
