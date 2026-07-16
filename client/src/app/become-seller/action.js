"use server";

import Endpoints from '../../constant/apiRoutes.js';
import { cookies } from 'next/headers';

export async function applyVendor(values) {
  const endpoints = Endpoints();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }

    const response = await fetch(`${endpoints.APPLY_VENDOR}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Shop detail missing.' };
    }

    return { success: true };
    
  } catch (error) {
    console.error("Server Action Registration Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}