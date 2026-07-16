"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/InputField';
import Link from 'next/link';
import { registerUser } from './actions';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: 'vendor_test_2nd',
      email: 'vendor_2nd@gmail.com',
      password: '123456',
      phone_number: '7410903250',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      phone_number: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        const result = await registerUser(values);
        if (result.success) {
         setShowSuccessPopup(true)
        } else {
          setError(result.error || 'Registration failed.');
        }
      } catch (err) {
        console.error("Register component error:", err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleBecomeSeller = () => {
    
    router.push('/become-seller');
  };

  const handleSkip = () => {
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <>
      {showSuccessPopup && (
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your account has been created successfully. Welcome to our platform!
            </p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={handleBecomeSeller}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/20 text-sm"
              >
                Become a Seller
              </button>
              
              <button 
                onClick={handleSkip}
                className="w-full py-3 bg-gray-50 hover:bg-gray-100 active:scale-[0.98] text-gray-700 font-semibold rounded-xl border border-gray-200 transition-all cursor-pointer text-sm"
              >
                Explore as Customer
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="h-screen flex overflow-hidden p-5 gap-5">
        
        <div className="hidden lg:flex lg:w-1/2 bg-orange-500 rounded-[70px] flex-col items-center justify-center p-12 relative overflow-hidden sticky top-0 h-full flex-shrink-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-400 rounded-full opacity-40" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600 rounded-full opacity-30" />

          <div className="relative z-10 text-center max-w-sm">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Join and grow your business with us.
            </h1>
            <p className="text-orange-100 text-base leading-relaxed">
              Create your account and start managing your store with our powerful dashboard.
            </p>
            <div className="mt-6 mx-auto w-16 h-1 bg-white rounded-full opacity-70" />
          </div>
          <div className="relative w-57.5 h-57.5 absolute -bottom-6">
            <Image src="/images/person.png" fill alt="person_image" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-full flex items-center justify-center bg-white px-8 py-12 scrollbar-hidden">
          <div className="w-full max-w-md">

            <div className="flex items-center gap-2 mb-8">
              <div className="w-12.5 h-12.5 rounded-full bg-gray-100 text-white font-bold text-sm relative">
                <Image src="/images/logo.png" fill alt="logo" className="w-full h-full object-cover" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-1">Create Account</h2>
            <p className="text-sm text-gray-400 mb-8">Fill in your details to get started</p>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-1">
              <InputField
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.errors.name}
                touched={formik.touched.name}
              />
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
              />
              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.errors.password}
                touched={formik.touched.password}
              />
              <InputField
                id="phone_number"
                name="phone_number"
                type="text"
                label="Phone Number"
                placeholder="Phone number (10 digits)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                error={formik.errors.phone_number}
                touched={formik.touched.phone_number}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl mt-2 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Sign Up'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-orange-500 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}