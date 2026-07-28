"use server";

import { cookies } from "next/headers";
import Endpoints from "../../../../constant/apiRoutes";

export async function VendorOrders() {
  const endpoint = Endpoints();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }
    const response = await fetch(`${endpoint.VENDOR_ORDER  }`, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'vendor order is not found.' };
    }

    return { success: true, products: data.products || data };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}