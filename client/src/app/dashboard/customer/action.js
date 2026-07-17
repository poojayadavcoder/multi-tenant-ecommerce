"use server"
import { cookies } from "next/headers";
import Endpoints from "../../../constant/apiRoutes";

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

    return { success: true, product: data.product || data };
    
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

export async function AddToCart(productId, quantity) {
  const endpoint = Endpoints()
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`; 
    }
   const response = await fetch(`${endpoint.ADD_TO_CART}`,{
    method : "POST",
    headers: headers,
    body : JSON.stringify({
        productId: productId,
        quantity: quantity
      })
   })

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
      return { success: false, error: data.message || 'Product is not updated.' };
    }

    return { success: true, product: data.product || data };

  }
  catch (error) {
    console.error("Server Action login Error:", error);
    return { success: false, error: 'Internal server error. Please try again.' };
  }
}