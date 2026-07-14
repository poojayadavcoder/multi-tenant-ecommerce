"use server";

import Endpoints from '../../../../constant/apiRoutes';

export async function Products() {
  const endpoint = Endpoints();
  try {
    const response = await fetch(`${endpoint.GET_PRODUCTS}`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not geting.' };
    }

    return { success: true, products: data.products || data };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}