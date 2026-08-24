"use server";

import Endpoints from "../../../../constant/apiRoutes";
import { request } from "../../../../controller/RequestController.server";

export async function VendorProducts() {
  const endpoint = Endpoints();
  const result = await request(endpoint.VENDOR_PRODUCTS, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not getting." };
  }

  return { success: true, products: result.data?.products || result.data };
}

export async function ProductsById(id) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.GET_PRODUCTS}/${id}`, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not getting." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function CreateProduct(formData) {
  const endpoint = Endpoints();
  const result = await request(endpoint.GET_PRODUCTS, "POST", { body: formData });

  if (!result.success) {
    return { success: false, error: result.error || "Product is not created." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function UpdateProduct(id, formData) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.GET_PRODUCTS}/${id}`, "PUT", { body: formData });

  if (!result.success) {
    return { success: false, error: result.error || "Product is not updated." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function DeleteProduct(id) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.GET_PRODUCTS}/${id}`, "DELETE");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not deleted." };
  }

  return { success: true, products: result.data?.products || result.data };
}