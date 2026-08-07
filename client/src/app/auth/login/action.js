"use server";

import Endpoints from '../../../constant/apiRoutes';
import { cookies } from 'next/headers';

export async function loginUser(values) {
  const endpoint = Endpoints();
  try {
    const response = await fetch(`${endpoint.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Login failed.' };
    }

    const { accessToken, refreshToken } = data;

    if (accessToken && refreshToken) {
      const cookieStore = await cookies();
      
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60,
        path: '/',
      });
    }

    return { success: true };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}