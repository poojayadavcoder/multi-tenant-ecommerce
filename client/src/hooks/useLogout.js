"use client";

import { logoutAction } from '../app/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logoutAction();
    
    if (result.success) {
      router.push('/auth/login');
      router.refresh(); 
    }
    setIsLoggingOut(false);
  };

  return { handleLogout, isLoggingOut };
}