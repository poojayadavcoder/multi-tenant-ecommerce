"use server";

import Endpoints from '../../../../constant/apiRoutes';
import { cookies } from 'next/headers';
export async function VendorProducts() {
  const endpoint = Endpoints();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    console.log(token)

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }
    const response = await fetch(`${endpoint.VENDOR_PRODUCTS  }`, {
      method: 'GET',
      headers: headers,
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
export async function ProductsById(id) {
  const endpoint = Endpoints();
  try {
    const response = await fetch(`${endpoint.GET_PRODUCTS}/${id}`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not geting.' };
    }

    return { success: true, product: data.product || data };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}

export async function CreateProduct(formData) {
  const endpoint = Endpoints();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }
    const response = await fetch(`${endpoint.GET_PRODUCTS}`, {
      method: 'POST',
      headers: headers,
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not created.' };
    }

    return { success: true, product: data.product || data };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}

export async function UpdateProduct(id, formData) {
  const endpoint = Endpoints();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }
    const response = await fetch(`${endpoint.GET_PRODUCTS}/${id}`, {
      method: 'PUT',
      headers: headers,
      body: formData,
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not updated.' };
    }

    return { success: true, product: data.product || data };
    
  } catch (error) {
    console.error("Server Action Update Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}

export async function DeleteProduct(id) {
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
    const response = await fetch(`${endpoint.GET_PRODUCTS}/${id}`, {
      method: 'DELETE',
      headers: headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not deleted.' };
    }

    return { success: true, products: data.products || data };
    
  } catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}