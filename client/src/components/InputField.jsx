'use client';
import React, { useState } from 'react';

const InputField = ({ label, id, name, type = 'text', placeholder, onChange, onBlur, value, error, touched }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col mb-4 relative">
      {label && (
        <label htmlFor={id} className="mb-1.5 text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder || label}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-800 placeholder-gray-400
            focus:outline-none focus:bg-white transition-all duration-200
            ${touched && error
              ? 'border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-400'
              : 'border-gray-200 focus:ring-2 focus:ring-orange-100 focus:border-orange-400'
            }
            ${isPassword ? 'pr-11' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 6.943 7.523 4 12 4c4.478 0 8.268 2.943 9.542 7-1.274 5.057-5.064 8-9.542 8-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs mt-1.5 absolute -bottom-5 left-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
