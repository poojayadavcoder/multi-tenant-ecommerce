"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/InputField';
import Link from 'next/link';
import { loginUser } from './action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'vendor@gmail.com',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        console.log("hii")
        const result = await loginUser(values);
        if (result.success) {
          router.push('/dashboard');
          router.refresh();
        } else {
          setError(result.error || 'Login failed.');
        }
      } catch (err) {
        console.error("Login component error:", err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="h-screen flex overflow-hidden p-5 gap-5">
      <div className="hidden lg:flex lg:w-1/2 bg-orange-500 rounded-[70px] flex-col items-center justify-center p-12 relative overflow-hidden sticky top-0 h-full flex-shrink-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-400 rounded-full opacity-40" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600 rounded-full opacity-30" />

        <div className="relative z-10 text-center max-w-sm">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Empower your store, scale your sales
          </h1>
          <p className="text-orange-100 text-base leading-relaxed">
            Manage products, track analytics, and fulfill orders seamlessly from one secure vendor dashboard.
          </p>
        </div>
        <div className='realtive w-57.5 h-57.5 absolute -bottom-6'>
            <Image src="/images/person.png" fill alt="person_image" className='w-full h-full object-contain'/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto h-full flex items-center justify-center bg-white px-8 py-12 scrollbar-hidden">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12.5 h-12.5 rounded-full bg-gray-100  text-white font-bold text-sm relative">
              <Image src="/images/logo.png" fill alt="logo" className='w-full h-full object-cover'/>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back</h2>
          <p className="text-sm text-gray-400 mb-8">Please login to your account</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-1">
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

            <div className="flex justify-end">
              <button type="button" className="text-xs text-orange-500 hover:underline">
                Forgot password?
              </button>
            </div>

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
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-orange-500 hover:underline font-semibold">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}